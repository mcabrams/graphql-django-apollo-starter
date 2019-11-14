import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@src/redux/root-reducer';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
