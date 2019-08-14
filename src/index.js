// -- register block type
const { 
    registerBlockType,
 } = wp.blocks;

// -- to get custom rest api data
const {
    apiFetch
} = wp;
const {
    registerStore,
    withSelect,
} = wp.data;

// -- custom testimonial REST API endpoints
const ssTestimonialApiUrl = "/ss-wp-9/v1/testimonials/"; 

// -- for customization
const { 
    AlignmentToolbar,
    RichText,
    BlockControls,
    BlockAlignmentToolbar,
    InspectorControls,
} = wp.editor;

// -- panels
const {
    TextControl,
    PanelBody,
    PanelRow,
} = wp.components;


// -- get testimonials by registering store
const DEFAULT_STATE = {
    dataTestimonials: {}
};
const actions = {
	setTestimonials( dataTestimonials ) {
		return {
			type: 'SET_TESTIMONIALS',
			dataTestimonials,
		};
	},
	getTestimonials( path ) {
		return {
			type: 'GET_TESTIMONIALS',
			path,
		};
	},
};

const store = registerStore( 'ss-wp-10/testimonials', {
	reducer( state = DEFAULT_STATE, action ) {
        console.log( action );
		switch ( action.type ) {
			case 'SET_TESTIMONIALS':
				return {
					...state,
					dataTestimonials: action.dataTestimonials,
				};
		}

		return state;
	},

	actions,

	selectors: {
		getTestimonials( state ) {
			const { dataTestimonials } = state;
			return dataTestimonials;
		},
	},

	controls: {
		GET_TESTIMONIALS( action ) {
			return apiFetch( { path: action.path } );
		},
	},

	resolvers: {
		* getTestimonials( customQuery ) {
			const dataTestimonials = yield actions.getTestimonials( ssTestimonialApiUrl+customQuery );
            
            console.log( customQuery );
            return actions.setTestimonials( dataTestimonials );
		},
	},
} );
// -- end get testimonials by registering store

registerBlockType( 'ss-wp-10/ss-testimonial-block', {
    title: 'Softwareseni Testimonial',
    icon: 'format-chat',
    category: 'common',
    attributes: {
        maxTestimonialPerPage: {
            type: 'integer',
            default: 1,
        },
        testimonialFontSize: {
            type: 'integer',
            default: 16,
        }
    },
    edit: withSelect( ( select, ownProps ) => {
        return (
            {
                testimonials: select( 'ss-wp-10/testimonials' ).getTestimonials( "?per_page="+ownProps.attributes.maxTestimonialPerPage )
            }
        )
    } )( ( { testimonials, className, attributes, setAttributes } ) => {        
        // -- set testimonial value
        const onChangeMaxTestimonial = ( newValue ) => {
            setAttributes( { maxTestimonialPerPage: Number.isNaN( parseInt( newValue ) ) ? 1 : parseInt( newValue ) } );
        };

        // -- set testimonial output
        if ( ! testimonials.data ) {
            return "Loading...";
        }
 
        if ( testimonials.data && testimonials.data.length === 0 ) {
            return "No Testimonials";
        }
        
        // -- store the results in array
        let testimonials_output = [];

        if( testimonials.data.length > 0 ) {
            for( let i=0; i<testimonials.data.length; i++ ) {
                testimonials_output.push( 
                    <a className={ 'ss-testimonial-title ' + className } href={ testimonials.data[i].guid }>
                        { testimonials.data[i].post_title }
                    </a>
                );
            }
        }
                
        return (
            <div>
                {
                    <InspectorControls>
                    <PanelBody title={ 'Maximum Testimonials Per Page' }>
                        <PanelRow>
                            <TextControl
                                onChange={onChangeMaxTestimonial}
                                value={attributes.maxTestimonialPerPage}
                            /> 
                        </PanelRow>
                    </PanelBody>
                    </InspectorControls>
                }
                { testimonials_output }
            </div>
        );
    }),
    save: () => {
        return null;
    },
} );