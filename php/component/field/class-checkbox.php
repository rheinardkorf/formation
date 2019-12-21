<?php
/**
 * TextArea class for Formation field.
 *
 * @package Formation
 */

namespace Formation\Component\Field;

use Formation;

/**
 * Class TextArea
 */
class Checkbox extends Select {

	/**
	 * The field type.
	 *
	 * @var string
	 */
	public $type = 'checkbox';

	/**
	 * Get the input template string for this fields input.
	 *
	 * @return string
	 */
	public function get_input_template() {
		$options = $this->build_options();

		return '<div %s>' . $options . '</div>';
	}

	/**
	 * Get the input template string for this fields input.
	 *
	 * @return string
	 */
	public function get_option_template() {
		return '<label><input %s />%s</label>';
	}

	/**
	 * Build a single option.
	 *
	 * @param string $option_value The value of the option.
	 * @param int    $index        The option index/number.
	 *
	 * @return array
	 */
	public function get_option_attributes( $option_value, $index ) {
		$value       = $this->get_value();
		$is_checked  = checked( $option_value, $value, false );
		$option_atts = array(
			'type'    => $this->type,
			'value'   => $option_value,
			'name'    => $this->get_option_name( $index ),
			'id'      => $this->get_option_id( $index ),
			'checked' => empty( $is_checked ) ? false : true,
		);

		return $option_atts;
	}

	/**
	 * Get the name for the option input.
	 *
	 * @param int $index The option index.
	 *
	 * @return string
	 */
	public function get_option_name( $index ) {
		$slug = $this->get_args( 'slug' );

		return $slug . '[' . $index . ']';
	}

	/**
	 * Get the id for the option input.
	 *
	 * @param int $index The option index.
	 *
	 * @return string
	 */
	public function get_option_id( $index ) {
		$slug = $this->get_args( 'slug' );

		return $slug . '_' . $index;
	}
}
