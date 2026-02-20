import { inject } from "@angular/core";
import {
    patchState,
    signalStore,
    withHooks,
    withMethods,
    withProps,
    withState,
} from "@ngrx/signals";
import { switchMap, tap, pipe, filter } from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Superhero, SuperheroCreationData } from "../../domain/models/superhero.model";
import { SuperheroGateway } from "../../domain/ports/superhero.gateway";

const initialState = {
    list: [] as Superhero[],
    isLoading: false,
    error: null as string | null,
    createSuccess: false,
};

export const SuperheroesStore = signalStore(
    withState(initialState),
    withProps(() => {
        const gateway = inject(SuperheroGateway);
        return {
            loadSuperheroes$: () => gateway.getSuperheroes$(),
            createSuperhero$: (name: string, power: string) => gateway.createSuperhero$(name, power)
        };
    }),
    withMethods((store) => {
        const setList = (list: Superhero[]) => patchState(store, { list })
        const setIsLoading = (isLoading: boolean) => patchState(store, { isLoading })
        const setError = (error: string | null) => patchState(store, { error })
        const setCreateSuccess = (createSuccessValue: boolean) => patchState(store, { createSuccess: createSuccessValue })

        const loadSuperhero = rxMethod<void>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null })),
                switchMap(() => store.loadSuperheroes$().pipe(
                    tap({
                        next: (value) => patchState(store, { list: value, isLoading: false }),
                        error: (error) => patchState(store, { error: error ?? 'Error in superHeroes load', isLoading: false })
                    })
                )),
            )
        );

        const createSuperhero = rxMethod<SuperheroCreationData>(
            pipe(
                tap(() => patchState(store, { isLoading: true, error: null, createSuccess: false })),
                switchMap(({ name, power }) =>
                    store.createSuperhero$(name, power).pipe(
                        filter((hero): hero is Superhero => hero !== null),
                        tap({
                            next: (createdHero) => 
                                patchState(store, { list: [...store.list(), createdHero], isLoading: false, createSuccess: true }),
                            error: (error) =>
                                patchState(store, { error: error ?? 'Error creating superhero', isLoading: false, createSuccess: false })
                        })
                    )
                )
            )
        );

        return {
            setList, setIsLoading, setError, setCreateSuccess, loadSuperhero, createSuperhero
        }
    }),
    withHooks({
        onInit(store) {
            store.loadSuperhero();
        },
    }),
);
