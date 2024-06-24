<?php
if ( ! class_exists( 'WPCFTO_WebFont_Loader' ) ) {
	/**
	 * Download webfonts locally.
	 */
	class WPCFTO_WebFont_Loader {

		/**
		 * The font-format.
		 *
		 * Use "woff" or "woff2".
		 * This will change the user-agent user to make the request.
		 *
		 * @since 1.0.0
		 * @var string
		 */
		protected $font_format = 'woff2';

		/**
		 * The remote URL.
		 *
		 * @since 1.1.0
		 * @var string
		 */
		protected $remote_url;

		/**
		 * The remote URL.
		 *
		 * @since 1.1.0
		 * @var string
		 */
		protected $key;

		/**
		 * Base path.
		 *
		 * @since 1.1.0
		 * @var string
		 */
		protected $base_path;

		/**
		 * Base URL.
		 *
		 * @since 1.1.0
		 * @var string
		 */
		protected $base_url;

		/**
		 * Subfolder name.
		 *
		 * @since 1.1.0
		 * @var string
		 */
		protected $subfolder_name;

		/**
		 * The fonts folder.
		 *
		 * @since 1.1.0
		 * @var string
		 */
		protected $fonts_folder;

		/**
		 * The local stylesheet's path.
		 *
		 * @since 1.1.0
		 * @var string
		 */
		protected $local_stylesheet_path;

		/**
		 * The local stylesheet's URL.
		 *
		 * @since 1.1.0
		 * @var string
		 */
		protected $local_stylesheet_url;

		/**
		 * The remote CSS.
		 *
		 * @since 1.1.0
		 * @var string
		 */
		protected $remote_styles;

		/**
		 * The final CSS.
		 *
		 * @since 1.1.0
		 * @var string
		 */
		protected $css;

		/**
		 * Constructor.
		 *
		 * Get a new instance of the object for a new URL.
		 *
		 * @param array $option_name The remote URLs.
		 * @param string $key The folder name.
		 *
		 * @since 1.1.0
		 */
		public function __construct( $option_name = array(), $key = '' ) {
			$fonts_url        = $this->get_nuxy_fonts_url( $option_name );
			$this->remote_url = $fonts_url;
			$this->key        = $key;
		}

		/**
		 * Get fonts url from nuxy.
		 *
		 * @param array $option_name Options name.
		 *
		 * @since 1.1.0
		 */
		private function get_nuxy_fonts_url( $option_name = array() ) {
			$fonts_url = '';
			if ( ! empty( $option_name['font-data']['family'] ) ) {
				$font_families[ strtolower( str_replace( ' ', '_', $option_name['font-data']['family'] ) ) ] = $option_name['font-data']['family'] . ':' . implode( ',', $option_name['font-data']['variants'] );
			}

			if ( ! empty( $font_families ) ) {
				$query_args = array(
					'family' => rawurlencode( implode( '|', $font_families ) ),
					'subset' => rawurlencode( 'latin,latin-ext' ),
				);

				$fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
			}

			return esc_url_raw( $fonts_url );
		}

		/**
		 * Delete the fonts folder.
		 *
		 * This runs as part of a cleanup routine.
		 *
		 * @return bool
		 * @since 1.1.0
		 */
		public function delete_fonts_folder() {
			return $this->get_filesystem()->delete( $this->get_fonts_folder(), true );
		}

		/**
		 * Get the local URL which contains the styles.
		 *
		 * Fallback to the remote URL if we were unable to write the file locally.
		 *
		 * @return string
		 * @since 1.1.0
		 */
		public function get_url() {

			// Check if the local stylesheet exists.
			if ( $this->local_file_exists() ) {

				// Attempt to update the stylesheet. Return the local URL on success.
				if ( $this->write_stylesheet() ) {
					return $this->get_local_stylesheet_url();
				}
			}

			// If the local file exists, return its URL, with a fallback to the remote URL.
			return file_exists( $this->get_local_stylesheet_path() )
				? $this->get_local_stylesheet_url()
				: $this->remote_url;
		}

		/**
		 * Get the local stylesheet URL.
		 *
		 * @return string
		 * @since 1.1.0
		 */
		public function get_local_stylesheet_url() {
			if ( ! $this->local_stylesheet_url ) {
				$this->local_stylesheet_url = '/wp-content/uploads/' . $this->get_subfolder_name() . '/' . $this->key . '/' . $this->get_local_stylesheet_filename() . '.css';
			}

			return $this->local_stylesheet_url;
		}

		/**
		 * Get styles with fonts downloaded locally.
		 *
		 * @return string
		 * @since 1.0.0
		 */
		public function get_styles() {

			// If we already have the local file, return its contents.
			$local_stylesheet_contents = $this->get_local_stylesheet_contents();
			if ( $local_stylesheet_contents ) {
				return $local_stylesheet_contents;
			}

			// Get the remote URL contents.
			$this->remote_styles = $this->get_remote_url_contents();

			// Get an array of locally-hosted files.
			$files = $this->get_local_files_from_css();

			// Convert paths to URLs.
			foreach ( $files as $remote => $local ) {
				$files[ $remote ] = str_replace(
					$this->get_base_path(),
					$this->get_base_url(),
					$local
				);
			}

			$this->css = str_replace(
				array_keys( $files ),
				array_values( $files ),
				$this->remote_styles
			);

			$this->write_stylesheet();

			return $this->css;
		}

		/**
		 * Get local stylesheet contents.
		 *
		 * @return string|false Returns the remote URL contents.
		 * @since 1.1.0
		 */
		public function get_local_stylesheet_contents() {
			$local_path = $this->get_local_stylesheet_path();

			// Check if the local stylesheet exists.
			if ( $this->local_file_exists() ) {

				// Attempt to update the stylesheet. Return false on fail.
				if ( ! $this->write_stylesheet() ) {
					return false;
				}
			}

			ob_start();
			include $local_path;

			return ob_get_clean();
		}

		/**
		 * Get remote file contents.
		 *
		 * @return string Returns the remote URL contents.
		 * @since 1.0.0
		 */
		public function get_remote_url_contents() {
			/**
			 * The user-agent we want to use.
			 *
			 * The default user-agent is the only one compatible with woff (not woff2)
			 * which also supports unicode ranges.
			 */
			$user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.1.2 Safari/603.3.8';

			// Switch to a user-agent supporting woff2 if we don't need to support IE.
			if ( 'woff2' === $this->font_format ) {
				$user_agent = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:73.0) Gecko/20100101 Firefox/73.0';
			}

			// Get the response.
			$response = wp_remote_get( $this->remote_url, array( 'user-agent' => $user_agent ) );

			// Early exit if there was an error.
			if ( is_wp_error( $response ) ) {
				return '';
			}

			// Get the CSS from our response.
			$contents = wp_remote_retrieve_body( $response );

			return $contents;
		}

		/**
		 * Download files mentioned in our CSS locally.
		 *
		 * @return array Returns an array of remote URLs and their local counterparts.
		 * @since 1.0.0
		 */
		public function get_local_files_from_css() {
			$font_files      = $this->get_remote_files_from_css();
			$stored          = get_site_option( 'downloaded_font_files', array() );
			$exclude_folders = array();
			$change          = false; // If in the end this is true, we need to update the cache option.

			if ( ! defined( 'FS_CHMOD_DIR' ) ) {
				define( 'FS_CHMOD_DIR', ( 0755 & ~umask() ) );
			}

			// If the fonts folder don't exist, create it.
			if ( ! file_exists( $this->get_fonts_folder() ) ) {
				$this->get_filesystem()->mkdir( $this->get_fonts_folder(), FS_CHMOD_DIR );
			}
			if ( ! file_exists( $this->get_fonts_folder() . '/' . $this->key ) ) {
				$this->get_filesystem()->mkdir( $this->get_fonts_folder() . '/' . $this->key, FS_CHMOD_DIR );
			}

			foreach ( $font_files as $font_family => $files ) {

				// The folder path for this font-family.
				$folder_path = $this->get_fonts_folder() . '/' . $this->key . '/' . $font_family;
				if ( $this->key ) {
					$exclude_folders[] = $font_family;
				}

				// If the folder doesn't exist, create it.
				if ( ! file_exists( $folder_path ) ) {
					$this->get_filesystem()->mkdir( $folder_path, FS_CHMOD_DIR );
				}

				foreach ( $files as $url ) {

					// Get the filename.
					$filename  = basename( wp_parse_url( $url, PHP_URL_PATH ) );
					$font_path = $folder_path . '/' . $filename;
					/**
					 * In Typekit, the filename will always be the same. We also need to check for query vars in their URLs.
					 * They provide this font variation description that we can use https://github.com/typekit/fvd
					 */
					$queries = parse_url( $url, PHP_URL_QUERY );
					if ( ! empty( $queries ) ) {
						$query_args = array();
						parse_str( $queries, $query_args );
						if ( array_key_exists( 'fvd', $query_args ) ) {
							$font_path .= $query_args['fvd'];
						}
					}

					// Check if the file already exists.
					if ( file_exists( $font_path ) ) {

						// Skip if already cached.
						if ( isset( $stored[ $url ] ) ) {
							continue;
						}

						// Add file to the cache and change the $changed var to indicate we need to update the option.
						$stored[ $url ] = $font_path;
						$change         = true;

						// Since the file exists we don't need to proceed with downloading it.
						continue;
					}

					/**
					 * If we got this far, we need to download the file.
					 */

					// require file.php if the download_url function doesn't exist.
					if ( ! function_exists( 'download_url' ) ) {
						require_once wp_normalize_path( ABSPATH . '/wp-admin/includes/file.php' );
					}

					// Download file to temporary location.
					$tmp_path = download_url( $url );

					// Make sure there were no errors.
					if ( is_wp_error( $tmp_path ) ) {
						continue;
					}

					// Move temp file to final destination.
					$success = $this->get_filesystem()->move( $tmp_path, $font_path, true );
					if ( $success ) {
						$stored[ $url ] = $font_path;
						$change         = true;
					}
				}
			}

			$this->deleteFoldersExceptSpecified( $this->get_fonts_folder() . '/' . $this->key, $exclude_folders );

			// If there were changes, update the option.
			if ( $change ) {

				// Cleanup the option and then save it.
				foreach ( $stored as $url => $path ) {
					if ( ! file_exists( $path ) ) {
						unset( $stored[ $url ] );
					}
				}
				update_site_option( 'downloaded_font_files', $stored );
			}

			return $stored;
		}

		/**
		 * Get font files from the CSS.
		 *
		 * @return array Returns an array of font-families and the font-files used.
		 * @since 1.0.0
		 */
		public function get_remote_files_from_css() {

			$font_faces = explode( '@font-face', $this->remote_styles );

			$result = array();

			// Loop all our font-face declarations.
			foreach ( $font_faces as $font_face ) {

				// Make sure we only process styles inside this declaration.
				$style = explode( '}', $font_face )[0];

				// Sanity check.
				if ( false === strpos( $style, 'font-family' ) ) {
					continue;
				}

				// Get an array of our font-families.
				preg_match_all( '/font-family.*?\;/', $style, $matched_font_families );

				// Get an array of our font-files.
				preg_match_all( '/url\(.*?\)/i', $style, $matched_font_files );

				// Get the font-family name.
				$font_family = 'unknown';
				if ( isset( $matched_font_families[0] ) && isset( $matched_font_families[0][0] ) ) {
					$font_family = rtrim( ltrim( $matched_font_families[0][0], 'font-family:' ), ';' );
					$font_family = trim( str_replace( array( "'", ';' ), '', $font_family ) );
					$font_family = sanitize_key( strtolower( str_replace( ' ', '-', $font_family ) ) );
				}

				// Make sure the font-family is set in our array.
				if ( ! isset( $result[ $font_family ] ) ) {
					$result[ $font_family ] = array();
				}

				// Get files for this font-family and add them to the array.
				foreach ( $matched_font_files as $match ) {

					// Sanity check.
					if ( ! isset( $match[0] ) ) {
						continue;
					}

					// Add the file URL.
					$font_family_url = rtrim( ltrim( $match[0], 'url(' ), ')' );
					$font_family_url = str_replace( '"', '', $font_family_url );

					// Make sure to convert relative URLs to absolute.
					$font_family_url = $this->get_absolute_path( $font_family_url );

					$result[ $font_family ][] = $font_family_url;
				}

				// Make sure we have unique items.
				// We're using array_flip here instead of array_unique for improved performance.
				$result[ $font_family ] = array_flip( array_flip( $result[ $font_family ] ) );
			}

			return $result;
		}

		/**
		 * Write the CSS to the filesystem.
		 *
		 * @return string|false Returns the absolute path of the file on success, or false on fail.
		 * @since 1.1.0
		 */
		protected function write_stylesheet() {
			$file_path  = $this->get_local_stylesheet_path();
			$filesystem = $this->get_filesystem();

			if ( ! defined( 'FS_CHMOD_DIR' ) ) {
				define( 'FS_CHMOD_DIR', ( 0755 & ~umask() ) );
			}

			// If the folder doesn't exist, create it.
			if ( ! file_exists( $this->get_fonts_folder() ) ) {
				$this->get_filesystem()->mkdir( $this->get_fonts_folder(), FS_CHMOD_DIR );
			}
			if ( ! file_exists( $this->get_fonts_folder() . '/' . $this->key ) ) {
				$this->get_filesystem()->mkdir( $this->get_fonts_folder() . '/' . $this->key, FS_CHMOD_DIR );
			}

			// If the file doesn't exist, create it. Return false if it can not be created.
			if ( ! $filesystem->exists( $file_path ) && ! $filesystem->touch( $file_path ) ) {
				return false;
			} else {
				// remove .css files except current created file
				$dir_path = $this->get_fonts_folder() . '/' . $this->key;
				if ( $filesystem->is_dir( $dir_path ) ) {
					// Get the list of files in the directory
					$files = $filesystem->dirlist( $dir_path );

					// Loop through the files and delete .css files
					foreach ( $files as $file => $fileinfo ) {
						if ( '.css' === substr( $file, - 4 ) ) {
							if ( $this->get_local_stylesheet_filename() . '.css' !== $file ) {
								$filesystem->delete( $dir_path . '/' . $file );
							}
						}
					}
				}
			}

			// If we got this far, we need to write the file.
			// Get the CSS.
			if ( ! $this->css ) {
				$this->get_styles();
			}

			// Put the contents in the file. Return false if that fails.
			if ( ! $filesystem->put_contents( $file_path, $this->css ) ) {
				return false;
			}

			return $file_path;
		}

		/**
		 * Get the stylesheet path.
		 *
		 * @return string
		 * @since 1.1.0
		 */
		public function get_local_stylesheet_path() {
			if ( ! $this->local_stylesheet_path ) {
				$this->local_stylesheet_path = $this->get_fonts_folder() . '/' . $this->key . '/' . $this->get_local_stylesheet_filename() . '.css';
			}

			return $this->local_stylesheet_path;
		}

		/**
		 * Get the local stylesheet filename.
		 *
		 * This is a hash, generated from the site-URL, the wp-content path and the URL.
		 * This way we can avoid issues with sites changing their URL, or the wp-content path etc.
		 *
		 * @return string
		 * @since 1.1.0
		 */
		public function get_local_stylesheet_filename() {
			return md5( $this->get_base_url() . $this->get_base_path() . $this->remote_url . $this->font_format );
		}

		/**
		 * Set the font-format to be used.
		 *
		 * @param string $format The format to be used. Use "woff" or "woff2".
		 *
		 * @return void
		 * @since 1.0.0
		 */
		public function set_font_format( $format = 'woff2' ) {
			$this->font_format = $format;
		}

		/**
		 * Check if the local stylesheet exists.
		 *
		 * @return bool
		 * @since 1.1.0
		 */
		public function local_file_exists() {
			return ( ! file_exists( $this->get_local_stylesheet_path() ) );
		}

		/**
		 * Get the base path.
		 *
		 * @return string
		 * @since 1.1.0
		 */
		public function get_base_path() {
			$upload     = wp_upload_dir();
			$upload_dir = $upload['basedir'];
			if ( ! $this->base_path ) {
				$this->base_path = apply_filters( 'wpcfto_get_local_fonts_base_path', $upload_dir );
			}

			return $this->base_path;
		}

		/**
		 * Get the base URL.
		 *
		 * @return string
		 * @since 1.1.0
		 */
		public function get_base_url() {
			if ( ! $this->base_url ) {
				$this->base_url = apply_filters( 'wpcfto_get_local_fonts_base_url', content_url( '/uploads/' ) );
			}

			return $this->base_url;
		}

		/**
		 * Get the subfolder name.
		 *
		 * @return string
		 * @since 1.1.0
		 */
		public function get_subfolder_name() {
			if ( ! $this->subfolder_name ) {
				$this->subfolder_name = apply_filters( 'wpcfto_get_local_fonts_subfolder_name', 'wpcfto_fonts' );
			}

			return $this->subfolder_name;
		}

		/**
		 * Get the folder for fonts.
		 *
		 * @return string
		 */
		public function get_fonts_folder() {
			if ( ! $this->fonts_folder ) {
				$this->fonts_folder = $this->get_base_path();
				if ( $this->get_subfolder_name() ) {
					$this->fonts_folder .= '/' . $this->get_subfolder_name();
				}
			}

			return $this->fonts_folder;
		}

		/**
		 * Get the filesystem.
		 *
		 * @return \WP_Filesystem_Base
		 * @since 1.0.0
		 */
		protected function get_filesystem() {
			global $wp_filesystem;

			// If the filesystem has not been instantiated yet, do it here.
			if ( ! $wp_filesystem ) {
				if ( ! function_exists( 'WP_Filesystem' ) ) {
					require_once wp_normalize_path( ABSPATH . '/wp-admin/includes/file.php' );
				}
				WP_Filesystem();
			}

			return $wp_filesystem;
		}

		/**
		 * Get an absolute URL from a relative URL.
		 *
		 * @param string $url The URL.
		 *
		 * @return string
		 */
		protected function get_absolute_path( $url ) {

			// If dealing with a root-relative URL.
			if ( 0 === stripos( $url, '/' ) ) {
				$parsed_url = parse_url( $this->remote_url );

				return $parsed_url['scheme'] . '://' . $parsed_url['hostname'] . $url;
			}

			return $url;
		}

		/**
		 * Delete folders not used
		 */
		private function deleteFoldersExceptSpecified( $dir, $excludeFolders ) {
			$wp_filesystem = $this->get_filesystem();

			if ( ! $wp_filesystem->is_dir( $dir ) ) {
				return;
			}

			$items = $wp_filesystem->dirlist( $dir );

			foreach ( $items as $item ) {
				if ( '.' === $item['name'] || '..' === $item['name'] ) {
					continue;
				}

				$fullPath = trailingslashit( $dir ) . $item['name'];

				if ( $wp_filesystem->is_dir( $fullPath ) ) {
					if ( ! in_array( $item['name'], $excludeFolders ) ) {
						$this->deleteDirectory( $fullPath );
					}
				}
			}
		}

		/**
		 * Delete folder and content
		 */
		private function deleteDirectory( $dir ) {
			$wp_filesystem = $this->get_filesystem();

			$items = $wp_filesystem->dirlist( $dir );

			foreach ( $items as $item ) {
				if ( '.' === $item['name'] || '..' === $item['name'] ) {
					continue;
				}

				$fullPath = trailingslashit( $dir ) . $item['name'];

				if ( $wp_filesystem->is_dir( $fullPath ) ) {
					$this->deleteDirectory( $fullPath );
				} else {
					$wp_filesystem->delete( $fullPath );
				}
			}
			$wp_filesystem->rmdir( $dir );
		}

	}
}
