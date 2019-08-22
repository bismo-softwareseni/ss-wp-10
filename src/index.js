// -- register block type
const { 
    registerBlockType,
 } = wp.blocks;

// -- to get custom rest api data
const {
    apiFetch
} = wp;
const {
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
    SelectControl,
    PanelBody,
    PanelRow,
} = wp.components;


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
        },
        testimonialData: {
            type: 'array',
            default: []
        }
    },
    edit: withSelect( ( select, ownProps ) => {
        return (
            {
                testimonials : apiFetch( { path: ssTestimonialApiUrl + "?per_page=" + ownProps.attributes.maxTestimonialPerPage } )
            }
        )
    } )( ( { testimonials, className, attributes, setAttributes, setState } ) => {  
        // -- set max testimonial to show per page attribute
        const onChangeMaxTestimonial = ( newValue ) => {
            setAttributes( { maxTestimonialPerPage: parseInt( newValue ) } );
        };
        
        const getTestimonialData = async value => {
            const response = await apiFetch( { path: ssTestimonialApiUrl + "?per_page=" + attributes.maxTestimonialPerPage } )
            .then(
                returned => {
                    attributes.testimonialData[ 0 ] = returned.data;
                    setAttributes( {testimonialData : attributes.testimonialData} );
                }
            );
        };

        // -- function to render testimonial output
        function TestimonialList( props ) {            
            const tst_IDs = props.testimonial_data;
            let tst_items = <div></div>;

            if( (tst_IDs[0] instanceof Array) ) {
                tst_items = tst_IDs[0].map((data_i) => 
                    <div>aasdasdasdasdads</div>
                );
            }

            return (
                <div>{tst_items}</div>
            );
        }

        /*/ -- get testimonials data & output
        if ( ! testimonials ) {
            return "Loading...";
        } else {
            // -- put the results into array
            testimonials.then( response => {
                attributes.testimonialData[ 0 ] = response.data;
                setAttributes( {testimonialData : attributes.testimonialData} );
            } );
        }*/

        //-- end get testimonials data & output
                
        return (
            <div>
                {
                    <InspectorControls>
                    <PanelBody title={ 'Maximum Testimonials Per Page' }>
                        <PanelRow>
                            <SelectControl
                                options={[
                                    { label: '1', value: 1 },
                                    { label: '2', value: 2 },
                                    { label: '3', value: 3 },
                                    { label: '4', value: 4 },
                                    { label: '5', value: 5 },
                                ]}
                                onChange={onChangeMaxTestimonial}
                                value={attributes.maxTestimonialPerPage}
                            /> 
                        </PanelRow>
                    </PanelBody>
                    </InspectorControls>
                }
                <TestimonialList testimonial_data={attributes.testimonialData} />
            </div>
        );
    }),
    save: () => {
        return null;
    },
} );