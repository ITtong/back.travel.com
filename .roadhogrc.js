{
    "entry";
    "src/index.js",
        "disableCSSModules";
    true,
        "env";
    {
        "development";
        {
            "extraBabelPlugins";
            [
                "dva-hmr",
                "transform-runtime",
                ["import", { "libraryName": "antd", "style": "css" }]
            ];
        }
        "production";
        {
            "extraBabelPlugins";
            [
                "transform-runtime",
                ["import", { "libraryName": "antd", "style": "css" }]
            ];
        }
    }
}
