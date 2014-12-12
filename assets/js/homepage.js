var gaussian, proportionHist, irisHistogram,
    carLayer, jitterLayer, carChart;
d3.csv("assets/data/iris.csv", function(error, iris) {
    gaussian = ggd3.geoms.density().kernel('gaussianKernel');
    proportionHist = ggd3.geoms.histogram().frequency(false);
    irisHistogram = ggd3.plot()
                    .facet({titleSize: [0,0]})
                    .margins({left: 50})
                    .aes({x: "Sepal.Width", fill: "Species",
                            color:'Species'})
                    .layers([proportionHist, gaussian])
                    .data(iris)
                    .width(700)
                    .height(350);
    irisHistogram.draw(d3.select('#iris'));
});
d3.csv("assets/data/mtcars.csv", function(error, cars) {
    carLayer = ggd3.layer()
                    .position('stack')
                    .stat({y: 'mean'})
                    .geom(ggd3.geoms.bar().offset('silhouette'));
    jitterLayer = ggd3.layer().position('jitter').geom('point');
    carChart = ggd3.plot()
                    .layers([carLayer, jitterLayer])
                    .width(250)
                    .facet({x:'am', nrows: 1})
                    .dtypes({"gear": ["string"], "cyl": ["string"]})
                    .data(cars)
                    .aes({x: "cyl", y: "mpg", fill: "gear", 
                         alpha: "hp"});
carChart.draw(d3.select('#cars'));
});
    