import { inject } from "@angular/core";
import {
    patchState,
    signalStore,
    withMethods,
    withProps,
    withState,
} from "@ngrx/signals";
import { switchMap, tap, pipe, EMPTY } from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Superhero, SuperheroUpdateData } from "../../domain/models/superhero.model";
import { SuperheroGateway } from "../../domain/ports/superhero.gateway";

const initialState = {
    superhero: null as Superhero | null,
    isLoading: false,
    error: null as string | null,
    updateSuccess: false,
};

export const SuperheroDetailsStore = signalStore(
    withState(initialState),
    withProps(() => {
        const gateway = inject(SuperheroGateway);
        return {
            loadSuperhero$: (id: string) => gateway.getSuperheroById$(id),
            updateSuperhero$: (id: string, input: { name?: string; power?: string }) => gateway.updateSuperhero$(id, input),
        };
    }),
    withMethods((store) => {
        const setSuperhero = (superhero: Superhero) => patchState(store, { superhero })
        const setIsLoading = (isLoading: boolean) => patchState(store, { isLoading })
        const setError = (error: string | null) => patchState(store, { error })
        const setUpdateSuccess = (updateSuccessValue: boolean) => patchState(store, { updateSuccess: updateSuccessValue })

        const loadSuperheroById = rxMethod<{ id: string }>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(({ id }) => store.loadSuperhero$(id).pipe(
                    tap({
                        next: (value) => patchState(store, { superhero: value, isLoading: false }),
                        error: (error) => patchState(store, { error: error ?? 'Error in superhero loading' })
                    })
                )),
            )
        )

        const updateCurrentHero = rxMethod<SuperheroUpdateData>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(({ name, power }) => {
                    const currentHero = store.superhero();
                    if (!currentHero) return EMPTY;

                    return store.updateSuperhero$(currentHero.id, { name, power }).pipe(
                        tap({
                            next: (updatedHero) => {
                                if (!updatedHero) {
                                    patchState(store, { error: 'Superhero update failed', isLoading: false, updateSuccess: false });
                                    return;
                                }

                                patchState(store, { superhero: updatedHero, isLoading: false, updateSuccess: true });
                            },
                            error: (error) => patchState(store, { error: error ?? 'Error updating superhero', isLoading: false, updateSuccess: false })
                        })
                    );
                })
            )
        );

        return {
            setSuperhero, setIsLoading, setError, setUpdateSuccess, loadSuperheroById, updateCurrentHero
        }
    })
);
