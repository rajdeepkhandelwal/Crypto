
<!-- Newsletter section -->
	<section id="element_subscribe" class="newsletter-section gradient-bg">
		<div class="container text-white">
			<div class="row">
				<div class="col-lg-7 newsletter-text">
					<h2>Subscribe to our Newsletter</h2>
					<p>Subscribe for our weekly industry updates, insider perspectives and in-depth market analysis.</p>
				</div>
				<div class="col-lg-5 col-md-8 offset-lg-0 offset-md-2">
					<?php echo form_open('home', 'class="newsletter-form"');?>
						<input type="email" name="user_email" placeholder="Enter your email">
						
						<button>Subscribe</button>

					<?php echo form_close();?>
					<?php echo form_error('user_email', '<div class="text-danger pl-5">', '</div>'); ?>
				</div>
			</div>
		</div>
	</section>
	<!-- Newsletter section end -->


	<!--====== Javascripts & Jquery ======-->
	<script src="<?php echo base_url();?>assets/js/jquery-3.2.1.min.js"></script>
	<script src="<?php echo base_url();?>assets/js/owl.carousel.min.js"></script>
	<script src="https://www.amcharts.com/lib/4/core.js"></script>
	<script src="https://www.amcharts.com/lib/4/charts.js"></script>
	<script src="https://www.amcharts.com/lib/4/themes/animated.js"></script>
	<script src="<?php echo base_url();?>assets/js/main.js"></script>
	
</body>
</html>