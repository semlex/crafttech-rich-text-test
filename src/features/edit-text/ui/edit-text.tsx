import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules } from '../models/modules';
import { useAppDispatch, useAppSelector } from '@/shared/libs';
import { updateSelectedFigure } from '@/entities/figure';
import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import './edit-text.scss';

const EditText = () => {
  const dispatch = useAppDispatch();

  const selectedFigure = useAppSelector((store) => store.figure.selectedFigure);

  const [value, setValue] = useState(selectedFigure?.html || '');
  const [debouncedValue] = useDebounce(value, 100);

  useEffect(() => {
    setValue(selectedFigure?.html || '');
  }, [selectedFigure]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(updateSelectedFigure({ html: debouncedValue }));
  }, [debouncedValue, dispatch]);

  return <ReactQuill modules={modules} value={value} onChange={handleChange} theme="snow" />;
};

export default EditText;
