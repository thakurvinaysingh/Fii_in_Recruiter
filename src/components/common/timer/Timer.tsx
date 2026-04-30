import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import GLOBALSTYLE from '../../../theme/GlobalStyle';
import {setIsTimeRunning, setTimeLeft} from '../../../redux/slices/CommonSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/Store';
const Timer = ({_BIG_TITLE}: {_BIG_TITLE?: boolean}) => {
  const timeLeft = useSelector(
    (state: RootState) => state.commonSlice.timeLeft,
  );

  const isTimeRunning = useSelector(
    (state: RootState) => state.commonSlice.isTimeRunning,
  );
  const timeOver = timeLeft === 0;
  const dispatch = useDispatch();

  let timer: NodeJS.Timeout;

  // useEffect(() => {
  //   dispatch(setTimeLeft(30));
  //   dispatch(setIsTimeRunning(true));
  // }, []);

  useEffect(() => {
    dispatch(setTimeLeft(timeLeft));
  }, [timeOver]);

  useEffect(() => {
    if (isTimeRunning && timeLeft > 0) {
      timer = setInterval(() => {
        dispatch(setTimeLeft(timeLeft - 1));
      }, 1000);
    } else if (timeLeft === 0) {
      dispatch(setIsTimeRunning(false));
    }

    return () => clearInterval(timer);
  }, [isTimeRunning, timeLeft]);

  return (
    <View>
      <Text style={[GLOBALSTYLE.medium_title, GLOBALSTYLE.text_center]}>
        {timeLeft < 10 ? `00:0${timeLeft}` : `00:${timeLeft}`}
      </Text>
    </View>
  );
};

export default Timer;
