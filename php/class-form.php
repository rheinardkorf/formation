<?php
/**
 * Form class for Formation.
 *
 * @package Formation
 */

namespace Formation;

use Formation\Component;

/**
 * Handles Formation's admin settings.
 */
class Form implements Component\Assets, Component\Setup, Component\Notice, Component\Post_Types {

	/**
	 * Holds the plugin instance.
	 *
	 * @since   0.1
	 * @var     Plugin Instance of the global plugin.
	 */
	private $plugin;

	/**
	 * The post type slug.
	 *
	 * @var string
	 */
	public static $slug = 'formation';

	/**
	 * Initiate the plugin resources.
	 *
	 * @param object $plugin Instance of the plugin.
	 */
	public function __construct( $plugin ) {
		$this->plugin = $plugin;
	}

	/**
	 * Set admin notice.
	 *
	 * @return array|null
	 */
	public function get_notices() {

		return null;
	}

	/**
	 * Setup hooks
	 *
	 * @since  0.1
	 */
	public function setup() {
		add_filter( 'allowed_block_types', array( $this, 'block_types' ), 10, 2 );
		add_filter( 'block_categories', array( $this, 'block_category' ), 10, 2 );
		add_shortcode( 'formation', array( $this, 'render_front_form' ) );
	}

	/**
	 * @param $args
	 */
	public function render_front_form( $args ) {
		$post = get_post( $args['form'] );

		$content = parse_blocks( $post->post_content );
		var_dump( $content );

	}

	/**
	 * Setup the blocks to be used.
	 *
	 * @param array|bool $blocks The current blocks available.
	 * @param \WP_Post   $post   The current post object.
	 *
	 * @return array|bool
	 */
	public function block_types( $blocks, $post ) {

		if ( self::$slug === $post->post_type ) {
			// @todo Decide which block we'll allow (if not all) and add our form element blocks.
			return array(
				'core/image',
				'core/paragraph',
				'core/heading',
				'core/list',
				'formation/text-input',
				'formation/text-area',
			);
		}

		return $blocks;
	}

	/**
	 * Add Form category.
	 *
	 * @param array    $categories The existing categories.
	 * @param \WP_Post $post       The current post.
	 *
	 * @return array
	 */
	public function block_category( $categories, $post ) {
		if ( self::$slug === $post->post_type ) {
			$categories = array_merge( [
				[
					'slug'  => 'fields',
					'title' => __( 'Form Fields', 'formation' ),
					'icon'  => 'dashicons-forms',
				],
			], $categories );
		}

		return $categories;
	}

	/**
	 * Register Post types.
	 */
	public function post_types() {
		// Register Custom Post Type.
		$labels = array(
			'name'                  => _x( 'Forms', 'Post Type General Name', 'formation' ),
			'singular_name'         => _x( 'Form', 'Post Type Singular Name', 'formation' ),
			'menu_name'             => __( 'Forms', 'formation' ),
			'name_admin_bar'        => __( 'Form', 'formation' ),
			'archives'              => __( 'Form Archives', 'formation' ),
			'attributes'            => __( 'Form Attributes', 'formation' ),
			'parent_item_colon'     => __( 'Parent Form:', 'formation' ),
			'all_items'             => __( 'All Forms', 'formation' ),
			'add_new_item'          => __( 'Add New Form', 'formation' ),
			'add_new'               => __( 'Add New', 'formation' ),
			'new_item'              => __( 'New Form', 'formation' ),
			'edit_item'             => __( 'Edit Form', 'formation' ),
			'update_item'           => __( 'Update Form', 'formation' ),
			'view_item'             => __( 'View Form', 'formation' ),
			'view_items'            => __( 'View Forms', 'formation' ),
			'search_items'          => __( 'Search Form', 'formation' ),
			'not_found'             => __( 'Not found', 'formation' ),
			'not_found_in_trash'    => __( 'Not found in Trash', 'formation' ),
			'featured_image'        => __( 'Featured Image', 'formation' ),
			'set_featured_image'    => __( 'Set featured image', 'formation' ),
			'remove_featured_image' => __( 'Remove featured image', 'formation' ),
			'use_featured_image'    => __( 'Use as featured image', 'formation' ),
			'insert_into_item'      => __( 'Insert into form', 'formation' ),
			'uploaded_to_this_item' => __( 'Uploaded to this item', 'formation' ),
			'items_list'            => __( 'Forms list', 'formation' ),
			'items_list_navigation' => __( 'Forms list navigation', 'formation' ),
			'filter_items_list'     => __( 'Filter items list', 'formation' ),
		);
		$args   = array(
			'label'               => __( 'Form', 'formation' ),
			'description'         => __( 'Formation form', 'formation' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'editor', 'revisions', 'page-attributes' ),
			'taxonomies'          => array( 'category' ),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'menu_position'       => 5,
			'menu_icon'           => 'dashicons-forms',
			'show_in_admin_bar'   => true,
			'show_in_nav_menus'   => true,
			'can_export'          => true,
			'has_archive'         => false,
			'exclude_from_search' => true,
			'publicly_queryable'  => false,
			'rewrite'             => false,
			'capability_type'     => 'page',
			'show_in_rest'        => true,
			'rest_base'           => self::$slug,
		);

		return array( self::$slug => $args );
	}

	/**
	 * Register assets to be used for the class.
	 */
	public function register_assets() {

		wp_register_script(
			'formation-blocks-js',
			$this->plugin->asset_url( 'js/dist/blocks.js' ),
			null,
			$this->plugin->asset_version(),
			false
		);
		wp_register_script(
			'formation-editor-js',
			$this->plugin->asset_url( 'js/dist/editor.js' ),
			array( 'wp-blocks', 'wp-element', 'wp-data' ),
			$this->plugin->asset_version(),
			false
		);
		wp_register_style(
			'formation-editor-css',
			$this->plugin->asset_url( 'css/editor.css' ),
			null,
			$this->plugin->asset_version()
		);
	}


	/**
	 * Enqueue Assets.
	 */
	public function enqueue_assets() {
	}

	/**
	 * Enqueue Assets.
	 */
	public function enqueue_editor_assets() {
		if ( $this->is_active() ) {
			wp_enqueue_script( 'formation-editor-js' );
			wp_enqueue_style( 'formation-editor-css' );
		}
		wp_enqueue_script( 'formation-blocks-js' );
		$this->load_form_data();
	}

	private function load_form_data() {

		$data  = array(
			array(
				'label' => null,
				'value' => null,
			),
		);
		$forms = get_posts( array( 'post_type' => self::$slug, 'numberposts' => - 1 ) );
		foreach ( $forms as $form ) {
			$data[] = array(
				'label' => $form->post_title,
				'value' => $form->ID,
			);
		}

		$script = 'var Formation = ' . wp_json_encode( $data );
		wp_add_inline_script( 'formation-blocks-js', $script );
	}

	/**
	 * Check if this class is active.
	 *
	 * @return bool True if active False if not.
	 */
	public function is_active() {
		$screen = get_current_screen();

		return $screen instanceof \WP_Screen && isset( $screen->post_type ) && 'formation' === $screen->post_type;
	}

}
