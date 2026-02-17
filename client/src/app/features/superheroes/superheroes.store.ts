import { inject } from "@angular/core";
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from "@ngrx/signals";
import { switchMap, tap, pipe } from "rxjs";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Superhero } from "./models/superhero.model";
import { SuperheroGateway } from "./ports/superhero.gateway";

const initialState = {
  list: [] as Superhero[],
  isLoading: false,
  error: null as string | null,
};

export const SuperheroesStore = signalStore(
  withState(initialState),
  withProps(() => {
    const gateway = inject(SuperheroGateway);
    return {
      load$: () => gateway.getSuperheroes$(),
      updateSuperhero$: (id: string, input: { name?: string; power?: string }) => gateway.updateSuperhero$(id, input)
    };
  }),
  withMethods((store) => {
    const setList = (list: Superhero[]) => patchState(store, { list })
    const setIsLoading = (isLoading: boolean) => patchState(store, { isLoading })
    const setError = (error: string | null) => patchState(store, { error })
    const load = rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() => store.load$().pipe(
          tap({
            next: (value) => patchState(store, { list: value, isLoading: false }),
            error: (error) => patchState(store, { error: error ?? 'Error in superHero load', isLoading: false })
          })
        )),
      )
    );
    const updateHero = rxMethod<{
      id: string,
      input: { name?: string; power?: string }
    }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(({ id, input }) => store.updateSuperhero$(id, input).pipe(
          tap({
            next: () => load(),
            error: (error) => patchState(store, { error: error ?? 'Error in superHero update', isLoading: false })
          })
        )),
      )
    )
    return {
      setList, setIsLoading, setError, load, updateHero
    }
  }),
  withHooks({
    onInit(store) {
      store.load();
    },
  }),
);
