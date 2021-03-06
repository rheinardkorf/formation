/**
 * Frontend scripts.
 *
 * @package Formation
 */

import './style.scss';

import initConditionals from './components/front-conditions';

const repeaterTemplates = {};
const repeaterEntries = {};
const repeaterTriggers = {};
const repeaterFields = {};

export const repeatable = ( element ) => {
    if ( !element ) {
        element = document;
    }
    const triggers = element.querySelectorAll( '[data-repeater]' );
    const templates = element.querySelectorAll( '[data-template]' );
    const repeaters = element.querySelectorAll( '[data-parent]' );
    [ ...triggers ].map( ( button ) => {
        button.addEventListener( 'click', addGroup );
        repeaterTriggers[ button.dataset.repeater ] = button;
    } );

    [ ...templates ].map( ( template ) => {
        const repeater_id = template.dataset.template;
        repeaterTemplates[ repeater_id ] = template.firstChild;
    } );

    // once we have templates, remove from dom.
    [ ...templates ].map( ( template ) => {
        template.remove();
    } );
    [ ...repeaters ].map( ( repeater ) => {
        repeaterFields[ repeater.dataset.parent ] = repeater;
        repeaterEntries[ repeater.dataset.parent ] = [];
        try {
            const values = JSON.parse( repeater.value );

            if ( values ) {
                values.forEach( ( value ) => {
                    const event = new CustomEvent( 'click', {
                        detail: value,
                    } );
                    repeaterTriggers[ repeater.dataset.parent ].dispatchEvent( event );
                } );
                buildEntries( repeater.dataset.parent );
            }
        }
        catch ( e ) {

        }
    } );

};

const addGroup = ( event ) => {

    const repeater = event.target.dataset.repeater;
    const holder = document.querySelector( '[data-container="' + repeater + '"]' );
    const template = repeaterTemplates[ repeater ];
    const instance_id = Math.floor( Math.random() * Math.floor( 99999 ) );

    const copy = template.cloneNode( true );
    const notices = copy.querySelectorAll( '[data-notice]' );
    const fields = copy.querySelectorAll( '[data-field]' );
    const struct = {};

    if ( !event.detail._invalid_ ) {
        [ ...notices ].map( ( notice ) => {
            notice.remove();
        } );
    }
    [ ...fields ].map( ( field ) => {
        const name = field.name;
        if ( name.indexOf( '[]' ) >= 0 ) {
            const name_part = JSON.parse( '{"' + name.replace( /\[/gi, '":[' ) + '}' );
            for ( const key in name_part ) {
                struct[ key ] = name_part[ key ];
                field.dataset.name = key;
            }
        }
        else {
            if ( field.type === 'checkbox' ) {
                if ( field.checked ) {
                    struct[ field.name ] = field.value;
                }
                else {
                    struct[ field.name ] = null;
                }
            }

            field.dataset.name = field.name;
        }

        field.name = null;
        if ( event.detail && event.detail[ field.dataset.name ] ) {
            if ( [ 'checkbox', 'radio' ].indexOf( field.type ) >= 0 ) {
                if ( event.detail[ field.dataset.name ].indexOf( field.value ) >= 0 ) {
                    field.checked = true;
                }
            }
            else {
                field.value = event.detail[ field.dataset.name ];
            }
        }
        field.name = field.name + '_' + instance_id;
        field.id = field.id + '_' + instance_id;

    } );

    // Label ID Update.
    const labels = copy.querySelectorAll( 'label' );
    [ ...labels ].map( ( label ) => {
        label.htmlFor = label.htmlFor + '_' + instance_id;
    } );

    copy.formationEntry = struct;
    holder.append( copy );
    repeatable( copy );
    repeaterEntries[ repeater ].push( copy );
    copy.querySelector( '[data-closer]' ).addEventListener( 'click', () => {
        const entry = repeaterEntries[ repeater ].indexOf( copy );
        repeaterEntries[ repeater ].splice( entry, 1 );
        copy.remove();

        buildEntries( repeater );
    } );
    elementJSON( copy, repeater );
};

export const elementJSON = ( element, repeater ) => {
    const fields = element.querySelectorAll( '[data-field]' );
    [ ...fields ].map( ( field ) => {

        field.addEventListener( 'input', ( event ) => {

            const { value } = field;
            const { name } = field.dataset;

            if ( field.type === 'checkbox' ) {
                if ( !field.checked ) {
                    let index = element.formationEntry[ name ].indexOf( value );
                    if ( element.formationEntry[ name ] && index >= 0 ) {
                        element.formationEntry[ name ].splice( index, 1 );
                    }
                }
                else {
                    element.formationEntry[ name ].push( value );
                }
            }
            else {
                if ( field.type === 'radio' ) {
                    if ( field.checked ) {
                        element.formationEntry[ name ] = value;
                    }
                }
                else {
                    element.formationEntry[ name ] = value;
                }
            }

            buildEntries( repeater );
        } );
        field.dispatchEvent( new Event( 'input' ) );
    } );
};

const buildEntries = ( repeater ) => {
    const entry = [];
    for ( const item of repeaterEntries[ repeater ] ) {
        entry.push( item.formationEntry );
    }
    repeaterFields[ repeater ].value = JSON.stringify( entry );
};

repeatable();
initConditionals();
