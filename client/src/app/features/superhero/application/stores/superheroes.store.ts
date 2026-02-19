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
import { Superhero } from "../../domain/models/superhero.model";
import { SuperheroGateway } from "../../domain/ports/superhero.gateway";

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
      loadSuperheroes$: () => gateway.getSuperheroes$(),
      updateSuperhero$: (id: string, input: { name?: string; power?: string }) => gateway.updateSuperhero$(id, input)
    };
  }),
  withMethods((store) => {
    const setList = (list: Superhero[]) => patchState(store, { list })
    const setIsLoading = (isLoading: boolean) => patchState(store, { isLoading })
    const setError = (error: string | null) => patchState(store, { error })
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

    return {
      setList, setIsLoading, setError, loadSuperhero
    }
  }),
  withHooks({
    onInit(store) {
      store.loadSuperhero();
    },
  }),
);
