properties {
    $filename      = 'async-loader-lite'
    $srcDir        = '.\src\'
    $inputPath     = $srcDir + $filename + '.js'
    $outputDir     = '.\dist\'
    $outputPath    = $outputDir + $filename + '.min.js'
    $yuiPath       = '.\bin\yuicompressor\yuicompressor-2.4.7.jar'
}

task default -depends Minify

task Minify {
    java -jar $yuiPath -o $outputPath $inputPath
}