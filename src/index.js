// -- register block type
const { 
    registerBlockType,
 } = wp.blocks;

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

// -- to retrieve testimonial data
const { 
    withSelect 
} = wp.data;
 

registerBlockType( 'ss-wp-10/ss-testimonial-block', {
    title: 'Softwareseni Testimonial',
    icon: 'format-chat',
    category: 'common',
    attributes: {
        maxTestimonialPerPage: {
            type: 'integer',
            default: 1,
        },
    },
    edit: withSelect( ( select, attributes ) => {
        return (
            {
                posts: select( 'core' ).getEntityRecords( 'postType', 'wt9-testimonial', { per_page: attributes.attributes.maxTestimonialPerPage } )
            }
        );
    } )( ( { posts, className, attributes, setAttributes } ) => {
        console.log( attributes );

        // -- set testimonial value
        const onChangeMaxTestimonial = ( newValue ) => {
            setAttributes( { maxTestimonialPerPage: Number.isNaN( parseInt( newValue ) ) ? 1 : parseInt( newValue ) } );
        };

        // -- get testimonials
        if ( ! posts ) {
            return "Loading...";
        }
 
        if ( posts && posts.length === 0 ) {
            return "No posts";
        }
        
        // -- store the results in array
        let results = [];

        if( posts.length > 0 ) {
            for( let i=0; i<posts.length; i++ ) {
                results.push( 
                    <a className={ 'ss-testimonial-title ' + className } href={ posts[i].link }>
                        { posts[i].title.rendered }
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
                { results }
            </div>
        );
    }),
    save: () => {
        return null;
    },
} );