// -- register block type
const { registerBlockType } = wp.blocks;

// -- for customization
const { 
    RichText,
    TextControl,
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
    InspectorControls,
} = wp.editor;

// -- panels
const {
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
        content: {
            type: 'integer',
            default: 1
        },
        alignment: {
            type: 'string',
            default: 'none',
        },
    },
    edit: withSelect( ( select ) => {
        return (
            {
                posts: select( 'core' ).getEntityRecords( 'postType', 'wt9-testimonial' )
            }
        )
    } )( ( { posts, className, props } ) => {
        const {
            attributes: {
                content,
                alignment,
            },
        } = props;

        const onChangeAlignment = ( newAlignment ) => {
            props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
        };

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
                    <BlockControls>
                    <AlignmentToolbar
                        value={ alignment }
                        onChange={ onChangeAlignment }
                    />
                    </BlockControls>
                }
                {
                    <InspectorControls>
                    <PanelBody title={ 'Maximum Testimonials Per Page' } >
                        <PanelRow>
                            <TextControl
                                label="Maximum Testimonials Per Page"
                                value={ className }
                                onChange={ onChangeContent }
                            />
                        </PanelRow>
                    </PanelBody>
                    </InspectorControls>
                }
                { results }
            </div>
        ) 
    } ),
    save: ( props ) => {
        return null;
    },
} );