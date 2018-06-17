(function(){
    this.VixSlider = function (){
        this.startButton = null;
        this.stopButton = null;
        this.previousButton = null;
        this.nextButton = null;
        this.slides = null;
        var defaults = {
            initIndex : 0,
            maxWidth : 640,
            maxHeight : 300,
            delay : 2000,
            automatic : true,
            direction : 'forward',
            containerClassName : 'slider-container',
            slidesClassName : 'slides',
            slideClassName : 'slide',
            slideControlsClassName : 'slide-controls',
            slideControlsMoreClassName : 'slide-controls-more',
            activeClassName : 'active',
            animationClassName : 'fade',
            captionClassName : 'caption'
        }

        /* Create options by extending defaults with the passed in argument */
        if (arguments[0] && typeof arguments[0] === "object"){
            this.options = extendDefaults(defaults, arguments[0]);
        } else{
            this.options = defaults;
        }
    }
    // Public Methods
    VixSlider.prototype.autoSlide = function(){
        var that = this;
        
        var container = document.querySelector("." + this.options.containerClassName);
        var slides = container.querySelectorAll('.slides .slide');
        if (this.options.initIndex < 0){
            this.options.initIndex = slides.length-1;
        } else if (this.options.initIndex > slides.length-1){
            this.options.initIndex = 0;
        } 
        this.showSlides(slides, this.options.initIndex);
        this.options.initIndex++;
        var repeat = function(){
            that.autoSlide();
        }
        setTimeout(repeat, this.options.delay);
    }

    VixSlider.prototype.showSlides = function (slides, index){
        //var container = document.querySelector("."+this.options.containerClassName);
        //var slides = container.querySelectorAll('.slides .slide');
        if (index > slides.length-1){
            index = 0;
        }
        if (index < 0){
            index = slides.length;
        }
        for (i = 0; i < slides.length; i++){
            Array.prototype.forEach.call(slides[i].getElementsByClassName(this.options.captionClassName), function (node) {
                    node.parentNode.removeChild(node);
                });
            if (i === index){
                var currSlide = slides[index];
                currSlide.classList.add(this.options.activeClassName);
                currSlide.classList.add(this.options.animationClassName);
                var spanCaption = document.createElement('span');
                spanCaption.classList = this.options.captionClassName;
                spanCaption.innerText = currSlide.querySelector('img').alt;
                currSlide.appendChild(spanCaption);
            }else{
                slides[i].classList.remove(this.options.activeClassName);
                slides[i].classList.remove(this.options.animationClassName);
            }
        }
    }

    //Private Methods
    /* Utility method to extend defaults with user options */
    function extendDefaults(source, properties){
        var property;
        for (property in properties){
            if (properties.hasOwnProperty(property)){
                source[property] = properties[property];
            }
        }
        return source;
    }
}());