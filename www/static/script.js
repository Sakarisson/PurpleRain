'use strict';

{
    let canvas = null,
        context = null;

    let raindrops = [];

    const cfg = {
        canvasWidth: 800,
        canvasHeight: 800,
        backgroundColor: '#d4afff',
        rainColor: '#7500fc',
        minFallSpeed: 4,
        maxFallSpeed: 8,
        numberOfDrops: 2500
    }

    function raindrop() {
        this.width = 2;
        this.height = 12;
        this.fallSpeed = 5;
        this.acceleration = .05;
        this.x = 0;
        this.y = 0;

        this.init = function() {
            this.x = Math.floor(Math.random() * cfg.canvasWidth);
            this.y = -Math.floor(Math.random() * cfg.canvasHeight);
            this.fallSpeed = cfg.minFallSpeed + Math.random() * (cfg.maxFallSpeed - cfg.minFallSpeed)
        }

        this.reset = function() {
            this.init();
            this.y = -this.height;
        }
    }

    function setup() { 
        canvas = $('#rainCanvas')[0];
        
        adjustWindow();

        context = canvas.getContext('2d');

        for(var i = 0; i < cfg.numberOfDrops; i++) {
            const pushDrop = new raindrop;
            pushDrop.init();
            raindrops.push(pushDrop);
        }

        setInterval(function() {
            mainLoop();
        }, 10);
    }

    function mainLoop() {
        clearCanvas();
        drawRain();
        moveRain();
    }

    function drawRain() {
        $.each(raindrops, function(i, drop) {
            context.beginPath();
            context.fillStyle = cfg.rainColor;
            context.fillRect(drop.x, drop.y, drop.width, drop.height);
        });
    }

    function moveRain() {
        $.each(raindrops, function(i, drop) {
            drop.y += drop.fallSpeed;
            drop.fallSpeed += drop.acceleration;
            if(drop.y > cfg.canvasHeight) {
                drop.reset();
            }
        });
    }

    function clearCanvas() {
        context.beginPath();
        context.rect(0, 0, cfg.canvasWidth, cfg.canvasHeight);
        context.fillStyle = cfg.backgroundColor;
        context.fill();
    }

    function adjustWindow() {
        cfg.canvasWidth = $(window).width();
        cfg.canvasHeight = $(window).height();

        canvas.width = cfg.canvasWidth;
        canvas.height = cfg.canvasHeight;
    }

    $(document).ready(setup);

    $(window).on('resize', function(){
        adjustWindow();
    });
}