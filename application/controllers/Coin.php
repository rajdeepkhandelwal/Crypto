<?php defined('BASEPATH') OR exit("No direct script access allowed") ;

/**
 * 
 */
class Coin extends CI_Controller
{
	
	function __construct()
	{
		parent::__construct();
	}

	public function details(){
		
		$this->load->view('templates/header');
		$this->load->view('token_view');
		$this->load->view('templates/footer');
	}
	
}


?>