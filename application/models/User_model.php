<?php 
defined('BASEPATH') OR exit("No direct script access allow");

/**
 * 
 */
class User_model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}
}

?>