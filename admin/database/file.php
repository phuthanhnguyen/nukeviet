<?php

/**
 * @Project NUKEVIET 4.x
 * @Author VINADES.,JSC (contact@vinades.vn)
 * @Copyright (C) 2014 VINADES.,JSC. All rights reserved
 * @License GNU/GPL version 2 or any later version
 * @Createdate 2-1-2010 21:51
 */

if( ! defined( 'NV_IS_FILE_DATABASE' ) ) die( 'Stop!!!' );

$log_dir = NV_ROOTDIR . '/' . NV_LOGS_DIR . '/dump_backup';
if( $global_config['idsite'] )
{
	$log_dir .= '/' . $global_config['site_dir'];
}

$xtpl = new XTemplate( 'files.tpl', NV_ROOTDIR . '/themes/' . $global_config['module_theme'] . '/modules/' . $module_file );
$xtpl->assign( 'LANG', $lang_module );
$xtpl->assign( 'GLANG', $lang_global );

$array_content = $array_time = array();
$files = scandir( $log_dir );

foreach( $files as $file )
{
	if( preg_match( '/^([a-zA-Z0-9]+)\_([a-zA-Z0-9\-\_]+)\.(sql|sql\.gz)+$/', $file, $mc ) )
	{
		$filesize = filesize( $log_dir . '/' . $file );
		$filetime = intval( filemtime( $log_dir . '/' . $file ) );
		$array_time[] = $filetime;

		$array_content[$filetime] = array(
			'file' => $file,
			'mc' => $mc,
			'filesize' => $filesize
		);
	}
}
sort( $array_time );

$a = 0;
$count = sizeof( $array_time ) - 1;
for( $index = $count; $index >= 0; --$index )
{
	$filetime = $array_time[$index];
	$value = $array_content[$filetime];
	$file = $value['file'];
	$mc = $value['mc'];

	$link_getfile = NV_BASE_ADMINURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&amp;' . NV_NAME_VARIABLE . '=' . $module_name . '&amp;' . NV_OP_VARIABLE . '=getfile&amp;filename=' . $file . '&amp;checkss=' . md5( $file . $client_info['session_id'] . $global_config['sitekey'] );
	$link_delete = NV_BASE_ADMINURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&amp;' . NV_NAME_VARIABLE . '=' . $module_name . '&amp;' . NV_OP_VARIABLE . '=delfile&amp;filename=' . $file . '&amp;checkss=' . md5( $file . $client_info['session_id'] . $global_config['sitekey'] );

	$xtpl->assign( 'ROW', array(
		'stt' => ++$a,
		'name' => $mc[2] . '.' . $mc[3],
		'filesize' => nv_convertfromBytes( $value['filesize'] ),
		'filetime' => nv_date( 'l d/m/Y h:i:s A', $filetime ),
		'link_getfile' => $link_getfile,
		'link_delete' => $link_delete
	) );

	$xtpl->parse( 'main.loop' );
}
$xtpl->assign( 'BACKUPNOW', NV_BASE_ADMINURL . 'index.php?' . NV_LANG_VARIABLE . '=' . NV_LANG_DATA . '&amp;' . NV_NAME_VARIABLE . '=' . $module_name . '&amp;' . NV_OP_VARIABLE . '=download&amp;checkss=' . md5( $client_info['session_id'] . $global_config['sitekey'] ) );
$page_title = $lang_module['file_backup'];

$xtpl->parse( 'main' );
$contents = $xtpl->text( 'main' );

include NV_ROOTDIR . '/includes/header.php';
echo nv_admin_theme( $contents );
include NV_ROOTDIR . '/includes/footer.php';