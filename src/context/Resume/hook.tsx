import { useContext } from 'react';
import { ResumeContext } from './provider';
import { ResumeContextType } from './types';

export const useResumeState = (): ResumeContextType => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResumeState must be used within an ResumeProvider');
    }
    return context;
};
