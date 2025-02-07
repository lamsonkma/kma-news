/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import covid19Slice from '@/features/covid19/covid19Slice';
import postSlice from '@/features/Post/postSlice';
import categorySlice from '@/features/Category/categorySlice';
import homeSlice from '@/features/HomePage/homeSlice';
import optionSlice from '@/features/Option/optionSlice';
import topicSlice from '@/features/Topic/topicSlice';
import commentSlice from '@kma-news/comment-slice';
import authSlice from '@kma-news/auth-slice';
import historySlice from '@kma-news/history-slice';
import channelSlice from '@kma-news/channel-slice';
import postOtherSlice from '@kma-news/posts-other-slice';
import searchSlice from '@kma-news/search-slice';

import saveSlice from '@kma-news/save-slice';

import reactPostSlice from '../../../../libs/react-post-slice/src';
import weatherSlice from '@/features/Weather/weatherSlice';

console.log(process.env['NX_API_URL']);

export const store = configureStore({
  reducer: {
    covid19: covid19Slice,
    auth: authSlice,
    post: postSlice,
    category: categorySlice,
    home: homeSlice,
    option: optionSlice,
    topic: topicSlice,
    comment: commentSlice,
    history: historySlice,
    channel: channelSlice,
    postOther: postOtherSlice,
    search: searchSlice,
    save: saveSlice,
    reactPost: reactPostSlice,
    weather: weatherSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
