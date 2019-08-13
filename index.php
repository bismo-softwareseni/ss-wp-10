<?php
/**
 * Plugin Name: SoftwareSeni - Gutenberg Testimonial Block
 * Description: Display testimonial using Gutenberg Block
 * Author: Bismo-SoftwareSeni
 * Version: 1.0.0
 * License: GPL2+
 *
 * @package ss-wp-10
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Testmonial block dynamic render callback
 *
 * @param Attributes $attributes from JS block.
 * @param
 */
function ss_testimonial_render_callback( $attributes, $content ) {
	/*
	$recent_posts = wp_get_recent_posts(
		array(
			'numberposts' => 3,
			'post_status' => 'publish',
		)
	);
	if ( count( $recent_posts ) === 0 ) {
		return 'No posts';
	}
	$post    = $recent_posts[0];
	$post_id = $post['ID'];
	return sprintf(
		'<a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a>',
		esc_url( get_permalink( $post_id ) ),
		esc_html( get_the_title( $post_id ) )
	);*/
	return 'woookeh';
}


/**
 * Registering testimonial block.
 */
function ss_register_block() {
	// -- main block script
	wp_register_script(
		'ss-testimonial-block',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-data' ),
		'v1.0',
		true
	);

	// -- editor style
	wp_register_style(
		'ss-testimonial-editor-style',
		plugins_url( '/style/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		'v1.0'
	);

	// -- frontend style
	wp_register_style(
		'ss-testimonial-style',
		plugins_url( '/style/style.css', __FILE__ ),
		array(),
		'v1.0'
	);

	// -- register the block
	register_block_type(
		'ss-wp-10/ss-testimonial-block',
		array(
			'style'           => 'ss-testimonial-style',
			'editor_style'    => 'ss-testimonial-editor-style',
			'editor_script'   => 'ss-testimonial-block',
			'render_callback' => 'ss_testimonial_render_callback',
			'attributes'      => array(
				'maxTestimonialPerPage' => array(
					'type'    => 'integer',
					'default' => 1,
				),
			),
		)
	);

}
add_action( 'init', 'ss_register_block' );
