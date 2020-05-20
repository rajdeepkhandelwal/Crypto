<?php 

defined('BASEPATH') OR exit("Not Direct Access Alloewd");


/**
 * 
 */
class Home extends CI_Controller
{

	public function index(){
		
		// $this->load->library('curl');
		// // $result = $this->curl->simple_get('https://api.icowatchlist.com/public/v1/finished');
		// $result = $this->curl->simple_get('https://api.nomics.com/v1/currencies/ticker?key=9fe31d6219dd1aa80874159b7a7355c6&ids=BTC,ETH,LINK,USDT,MKR,PAX,FTXTOKEN,REP,TUSD,DX,LSK&interval=1d');
		// $response['data'] = json_decode($result, true);
		// echo $response['ico']['finished'][0]['name'];
		$this->load->view('templates/header');
		$this->load->view('home_view');
		$this->load->view('templates/footer');
		
	}
	public function about(){

		$this->load->view('templates/header');
		$this->load->view('about_view');
		$this->load->view('templates/footer');
}



	public function contact(){

		$this->load->view('templates/header');
		$this->load->view('contact_view');
		$this->load->view('templates/footer');
}

	public function send_mail(){
		// $data['email'] = $this->user_model->get_user();
		$email = $this->input->post('user_email');
		$this->form_validation->set_rules('user_email', 'User Email', 'required|valid_email|is_unique[user.email]');
		// $this->form_validation->set_error_delimiters('<div class="error">', '</div>');
		if ($this->form_validation->run() === FALSE) {
			$this->load->view('templates/header');
			$this->load->view('home_view');
			$this->load->view('templates/footer');
		} else {
			 // ini_set("SMTP","ssl://smtp.gmail.com");
    //         ini_set("smtp_port","465");
			 $config = Array(
				  'protocol' => 'smtp',
				  'smtp_host' => 'ssl://smtp.gmail.com',
				  'smtp_port' => 465,
				  'smtp_timeout' => 10,
				  'smtp_user' => 'newsletter.crypto@gmail.com', // change it to yours
				  'smtp_pass' => '******', // change it to yours
				  'mailtype' => 'html',
				  'newline' => "\r\n",
				  'charset' =>'utf-8',
				  'wordwrap' => TRUE
				);

			$this->email->initialize($config);
			
			$this->email->from('newsletter.crypto@gmail.com','Crypto');
			$this->email->to($email);
			// $this->email->cc('another@another-example.com');
			// $this->email->bcc('them@their-example.com');

			$this->email->subject('Welcome to Crypto');
			$this->email->message('<h3>Welcome to Decentralized World.<h3>');
			// $this->email->set_newline("\r\n");

			if($this->email->send()){
				redirect('/','refresh');
			}else{
				echo $this->email->print_debugger();
			}
			
			
		}
		
	}

	
}

?>
