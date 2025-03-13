export default function Footer() {
    return (
        <footer id="footer" className="footer">
        <div className="container">
          
          
          <div className="hm-footer-copyright">
            <div className="row">
              <div className="col-sm-5">
                <p>
                  &copy;copyright. designed and developed by <a href="https://www.themesine.com/">themesine</a>
                </p>{/* /p */}
              </div>
              <div className="col-sm-7">
                <div className="footer-social">
                  <span><i className="fa fa-phone"> +1  (222) 777 8888</i></span>
                  <a href="#"><i className="fa fa-facebook"></i></a>
                  <a href="#"><i className="fa fa-twitter"></i></a>
                  <a href="#"><i className="fa fa-linkedin"></i></a>
                  <a href="#"><i className="fa fa-google-plus"></i></a>
                </div>
              </div>
            </div>

          </div>{/* /.hm-footer-copyright */}
        </div>{/* /.container */}

        <div id="scroll-Top">
          <div className="return-to-top">
            <i className="fa fa-angle-up " id="scroll-top" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back to Top" aria-hidden="true"></i>
          </div>

        </div>{/* /.scroll-Top */}

      </footer>
    );
}