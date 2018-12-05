<?php
  require_once dirname(__FILE__,2) . '/app/config/config.php';

	// compress html to reduce filesize
	$html = compressHtml(file_get_contents(ROOT_URL . "views/"));
	$html = parse($html);

	echo $html;
