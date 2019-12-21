const { __ } = window.wp.i18n;
import BaseInput from '../base-input';
import InputField from './input';
import Settings from './settings';

const field = {
    ...BaseInput,
    name: 'formation/text-area',
    title: __( 'Text Area' ),
    category: 'fields',
    icon: 'forms',
    keywords: [
        __( 'Field' ),
        __( 'Form' ),
        __( 'Text' )
    ],
    attributes: {
        ...BaseInput.attributes,
        rows: {
            type: 'number',
            default: 5
        }
    },
    input: InputField,
    settings: Settings,
};

const { name } = field;
export { field, name };

export const settings = field;
