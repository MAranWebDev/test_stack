import { trpc } from '@/libs/trpc/hooks';
import { useIsFetching } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';
import { TrpcRouterInputType, TrpcRouterOutputType } from '@workspace/api';
import { createContext, PropsWithChildren, useCallback, useMemo } from 'react';
import { useImmerReducer } from 'use-immer';

// Types
type SampleGetAllInput = TrpcRouterInputType['sample']['getAll'];
type SampleGetAllOutput = TrpcRouterOutputType['sample']['getAll'];

type Filters = Pick<SampleGetAllInput, 'id' | 'name' | 'isDone'>;
type Results = SampleGetAllOutput['results'];

interface ReadContext {
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  filters: Filters;
  dataCount: number;
  results: Results;
  isFetching: boolean;
}

interface UpdateContext {
  changePage: (page: number) => void;
  changeRowsPerPage: (rowsPerPage: number) => void;
  filterData: (filters: Filters) => void;
}

type State = Pick<ReadContext, 'page' | 'rowsPerPage' | 'filters'>;
type Actions = typeof ACTIONS;

interface ActionSetPage extends Pick<ReadContext, 'page'> {
  type: Actions['SET_PAGE'];
}
interface ActionSetRowsPerPage extends Pick<ReadContext, 'rowsPerPage'> {
  type: Actions['SET_ROWS_PER_PAGE'];
}
interface ActionSetFilters extends Pick<ReadContext, 'filters'> {
  type: Actions['SET_FILTERS'];
}
type Action = ActionSetPage | ActionSetRowsPerPage | ActionSetFilters;

// Constants
const ACTIONS = {
  SET_PAGE: 'SET_PAGE',
  SET_ROWS_PER_PAGE: 'SET_ROWS_PER_PAGE',
  SET_FILTERS: 'SET_FILTERS',
} as const;

const ROWS_PER_PAGE_OPTIONS = [5, 10, 25];

// Initial values
const initialStateValues: State = {
  page: 0,
  rowsPerPage: ROWS_PER_PAGE_OPTIONS[1],
  filters: {},
};

const sampleGetAll = trpc.sample.getAll;

// Create context
export const ReadSampleContext = createContext<ReadContext | undefined>(
  undefined,
);
export const UpdateSampleContext = createContext<UpdateContext | undefined>(
  undefined,
);

// Context provider
export const SampleProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useImmerReducer<State, Action>((draft, action) => {
    switch (action.type) {
      case ACTIONS.SET_PAGE:
        draft.page = action.page;
        break;
      case ACTIONS.SET_ROWS_PER_PAGE:
        draft.page = initialStateValues.page;
        draft.rowsPerPage = action.rowsPerPage;
        break;
      case ACTIONS.SET_FILTERS:
        draft.page = initialStateValues.page;
        draft.filters = action.filters;
        break;
      default:
        break;
    }
  }, initialStateValues);

  // Trpc
  const { data } = sampleGetAll.useQuery({
    page: state.page,
    rowsPerPage: state.rowsPerPage,
    id: state.filters.id,
    name: state.filters.name,
    isDone: state.filters.isDone,
  });

  const sampleGetAllKey = getQueryKey(sampleGetAll, undefined, 'query');
  const isFetching = useIsFetching({ queryKey: sampleGetAllKey }) > 0;

  // Methods
  const changePage = useCallback(
    (page: number) => dispatch({ type: ACTIONS.SET_PAGE, page }),
    [dispatch],
  );

  const changeRowsPerPage = useCallback(
    (rowsPerPage: number) =>
      dispatch({ type: ACTIONS.SET_ROWS_PER_PAGE, rowsPerPage }),
    [dispatch],
  );

  const filterData = useCallback(
    (filters: Filters) => dispatch({ type: ACTIONS.SET_FILTERS, filters }),
    [dispatch],
  );

  // Context values
  const readContextValues: ReadContext = {
    page: state.page,
    rowsPerPage: state.rowsPerPage,
    rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
    filters: state.filters,
    dataCount: data?.dataCount || 0,
    results: data?.results || [],
    isFetching,
  };

  const updateContextValues = useMemo(
    (): UpdateContext => ({
      changePage,
      changeRowsPerPage,
      filterData,
    }),
    [changePage, changeRowsPerPage, filterData],
  );

  return (
    <ReadSampleContext.Provider value={readContextValues}>
      <UpdateSampleContext.Provider value={updateContextValues}>
        {children}
      </UpdateSampleContext.Provider>
    </ReadSampleContext.Provider>
  );
};