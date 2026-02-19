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
import { Superhero } from "../../domain/models/superhero.model";
import { SuperheroGateway } from "../../domain/ports/superhero.gateway";

const initialState = {
    superhero: null as Superhero | null,
    isLoading: false,
    error: null as string | null,
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

        const loadSuperhero = rxMethod<{ id: string }>(
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

        const updateCurrentHero = rxMethod<{ name?: string; power?: string }>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(({ name, power }) => {
                    const id = store.superhero()?.id
                    if (id) {
                        return store.updateSuperhero$(id, { name, power }).pipe(
                            tap({
                                next: () => loadSuperhero({ id }),
                                error: (error) => patchState(store, { error: error ?? 'Error in superHero update', isLoading: false })
                            })
                        )
                    }
                    return EMPTY
                }),
            )
        )

        return {
            setSuperhero, setIsLoading, setError, loadSuperhero, updateCurrentHero
        }
    })
);
