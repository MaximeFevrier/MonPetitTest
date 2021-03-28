import {Dispatch, SetStateAction, useEffect} from 'react';
import {Keyboard, Platform} from 'react-native';

export default function useManageKeyboard(
  pickerIsVisible: boolean,
  setPickerIsVisible: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    if (pickerIsVisible) {
      Keyboard.dismiss();
    }
    const sub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setPickerIsVisible(false),
    );
    return () => sub.remove();
  }, [pickerIsVisible, setPickerIsVisible]);
}
