const firebase = require("firebase");


// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAJNp8NG1nZfK1dq18WzwEIF0sfgvGL4mw",
  authDomain: "cardiomyapothy-blog.firebaseapp.com",
  projectId: "cardiomyapothy-blog",
});
  
var db = firebase.firestore();

var uploadData =[
  {
    "x": 0.0135,
    "control": 1.8071,
    "RGECO": 1.8231,
    "RGECO-TnT": 1.7984,
    "RGECO-TnI": 1.7771
  },
  {
    "x": 0.0405,
    "control": 1.7664,
    "RGECO": 1.7836,
    "RGECO-TnT": 1.7487,
    "RGECO-TnI": 1.7424
  },
  {
    "x": 0.0541,
    "control": 1.7466,
    "RGECO": 1.759,
    "RGECO-TnT": 1.724,
    "RGECO-TnI": 1.7245
  },
  {
    "x": 0.0676,
    "control": 1.7267,
    "RGECO": 1.7257,
    "RGECO-TnT": 1.699,
    "RGECO-TnI": 1.7059
  },
  {
    "x": 0.0811,
    "control": 1.7066,
    "RGECO": 1.6923,
    "RGECO-TnT": 1.6725,
    "RGECO-TnI": 1.686
  },
  {
    "x": 0.0946,
    "control": 1.6861,
    "RGECO": 1.6677,
    "RGECO-TnT": 1.6428,
    "RGECO-TnI": 1.6631
  },
  {
    "x": 0.1081,
    "control": 1.6647,
    "RGECO": 1.6467,
    "RGECO-TnT": 1.6173,
    "RGECO-TnI": 1.6369
  },
  {
    "x": 0.1216,
    "control": 1.642,
    "RGECO": 1.6266,
    "RGECO-TnT": 1.5945,
    "RGECO-TnI": 1.6098
  },
  {
    "x": 0.1486,
    "control": 1.5927,
    "RGECO": 1.5841,
    "RGECO-TnT": 1.5507,
    "RGECO-TnI": 1.5621
  },
  {
    "x": 0.1757,
    "control": 1.5471,
    "RGECO": 1.5235,
    "RGECO-TnT": 1.5074,
    "RGECO-TnI": 1.5228
  },
  {
    "x": 0.1892,
    "control": 1.5267,
    "RGECO": 1.501,
    "RGECO-TnT": 1.4855,
    "RGECO-TnI": 1.5053
  },
  {
    "x": 0.2297,
    "control": 1.4711,
    "RGECO": 1.4506,
    "RGECO-TnT": 1.4236,
    "RGECO-TnI": 1.4571
  },
  {
    "x": 0.2432,
    "control": 1.4536,
    "RGECO": 1.4358,
    "RGECO-TnT": 1.4055,
    "RGECO-TnI": 1.442
  },
  {
    "x": 0.3108,
    "control": 1.3708,
    "RGECO": 1.3661,
    "RGECO-TnT": 1.3321,
    "RGECO-TnI": 1.3708
  },
  {
    "x": 0.3243,
    "control": 1.3551,
    "RGECO": 1.3525,
    "RGECO-TnT": 1.3196,
    "RGECO-TnI": 1.3573
  },
  {
    "x": 0.3649,
    "control": 1.3124,
    "RGECO": 1.3121,
    "RGECO-TnT": 1.2844,
    "RGECO-TnI": 1.3192
  },
  {
    "x": 0.4054,
    "control": 1.2767,
    "RGECO": 1.2727,
    "RGECO-TnT": 1.2514,
    "RGECO-TnI": 1.2845
  },
  {
    "x": 0.4189,
    "control": 1.2657,
    "RGECO": 1.2599,
    "RGECO-TnT": 1.2406,
    "RGECO-TnI": 1.2733
  },
  {
    "x": 0.4324,
    "control": 1.2551,
    "RGECO": 1.2475,
    "RGECO-TnT": 1.23,
    "RGECO-TnI": 1.2622
  },
  {
    "x": 0.527,
    "control": 1.1839,
    "RGECO": 1.1731,
    "RGECO-TnT": 1.1581,
    "RGECO-TnI": 1.1877
  },
  {
    "x": 0.5676,
    "control": 1.1543,
    "RGECO": 1.1471,
    "RGECO-TnT": 1.1286,
    "RGECO-TnI": 1.1587
  },
  {
    "x": 0.5811,
    "control": 1.1445,
    "RGECO": 1.139,
    "RGECO-TnT": 1.119,
    "RGECO-TnI": 1.15
  },
  {
    "x": 0.6216,
    "control": 1.1153,
    "RGECO": 1.1158,
    "RGECO-TnT": 1.0912,
    "RGECO-TnI": 1.13
  },
  {
    "x": 0.6486,
    "control": 1.1057,
    "RGECO": 1.1014,
    "RGECO-TnT": 1.0744,
    "RGECO-TnI": 1.1218
  },
  {
    "x": 0.6892,
    "control": 1.0913,
    "RGECO": 1.0816,
    "RGECO-TnT": 1.0564,
    "RGECO-TnI": 1.109
  },
  {
    "x": 0.7027,
    "control": 1.0865,
    "RGECO": 1.0758,
    "RGECO-TnT": 1.0541,
    "RGECO-TnI": 1.1045
  },
  {
    "x": 0.7432,
    "control": 1.0721,
    "RGECO": 1.0626,
    "RGECO-TnT": 1.051,
    "RGECO-TnI": 1.0909
  },
  {
    "x": 0.7568,
    "control": 1.0673,
    "RGECO": 1.0608,
    "RGECO-TnT": 1.0485,
    "RGECO-TnI": 1.0865
  },
  {
    "x": 0.7703,
    "control": 1.0625,
    "RGECO": 1.061,
    "RGECO-TnT": 1.0452,
    "RGECO-TnI": 1.082
  },
  {
    "x": 0.7838,
    "control": 1.064,
    "RGECO": 1.0631,
    "RGECO-TnT": 1.0414,
    "RGECO-TnI": 1.0776
  },
  {
    "x": 0.7973,
    "control": 1.0636,
    "RGECO": 1.0656,
    "RGECO-TnT": 1.0373,
    "RGECO-TnI": 1.0732
  },
  {
    "x": 0.8514,
    "control": 1.0579,
    "RGECO": 1.0686,
    "RGECO-TnT": 1.0212,
    "RGECO-TnI": 1.0551
  },
  {
    "x": 0.8649,
    "control": 1.0556,
    "RGECO": 1.0673,
    "RGECO-TnT": 1.0182,
    "RGECO-TnI": 1.0504
  },
  {
    "x": 0.9054,
    "control": 1.0467,
    "RGECO": 1.0585,
    "RGECO-TnT": 1.0182,
    "RGECO-TnI": 1.0345
  },
  {
    "x": 0.9189,
    "control": 1.043,
    "RGECO": 1.054,
    "RGECO-TnT": 1.0151,
    "RGECO-TnI": 1.0282
  },
  {
    "x": 0.973,
    "control": 1.0239,
    "RGECO": 1.0303,
    "RGECO-TnT": 0.994,
    "RGECO-TnI": 0.9985
  },
  {
    "x": 1,
    "control": 1.0117,
    "RGECO": 1.0158,
    "RGECO-TnT": 0.9814,
    "RGECO-TnI": 0.9821
  },
  {
    "x": 1.0676,
    "control": 0.9747,
    "RGECO": 0.9746,
    "RGECO-TnT": 0.9461,
    "RGECO-TnI": 0.9396
  },
  {
    "x": 1.0946,
    "control": 0.958,
    "RGECO": 0.957,
    "RGECO-TnT": 0.9303,
    "RGECO-TnI": 0.9223
  },
  {
    "x": 1.1486,
    "control": 0.9222,
    "RGECO": 0.9203,
    "RGECO-TnT": 0.8959,
    "RGECO-TnI": 0.8878
  },
  {
    "x": 1.2568,
    "control": 0.8453,
    "RGECO": 0.8434,
    "RGECO-TnT": 0.8198,
    "RGECO-TnI": 0.8178
  },
  {
    "x": 1.2838,
    "control": 0.8255,
    "RGECO": 0.8236,
    "RGECO-TnT": 0.8002,
    "RGECO-TnI": 0.799
  },
  {
    "x": 1.2973,
    "control": 0.8155,
    "RGECO": 0.8137,
    "RGECO-TnT": 0.7904,
    "RGECO-TnI": 0.7893
  },
  {
    "x": 1.4189,
    "control": 0.7246,
    "RGECO": 0.7229,
    "RGECO-TnT": 0.7013,
    "RGECO-TnI": 0.6982
  },
  {
    "x": 1.5135,
    "control": 0.6535,
    "RGECO": 0.6511,
    "RGECO-TnT": 0.6317,
    "RGECO-TnI": 0.6266
  },
  {
    "x": 1.527,
    "control": 0.6433,
    "RGECO": 0.6408,
    "RGECO-TnT": 0.6218,
    "RGECO-TnI": 0.6164
  },
  {
    "x": 1.5676,
    "control": 0.6128,
    "RGECO": 0.61,
    "RGECO-TnT": 0.592,
    "RGECO-TnI": 0.5862
  },
  {
    "x": 1.7297,
    "control": 0.4907,
    "RGECO": 0.4878,
    "RGECO-TnT": 0.4719,
    "RGECO-TnI": 0.4662
  },
  {
    "x": 1.7432,
    "control": 0.4805,
    "RGECO": 0.4776,
    "RGECO-TnT": 0.4617,
    "RGECO-TnI": 0.4562
  },
  {
    "x": 1.7703,
    "control": 0.4601,
    "RGECO": 0.4573,
    "RGECO-TnT": 0.4411,
    "RGECO-TnI": 0.436
  },
  {
    "x": 1.8514,
    "control": 0.3991,
    "RGECO": 0.3964,
    "RGECO-TnT": 0.378,
    "RGECO-TnI": 0.3747
  },
  {
    "x": 1.9324,
    "control": 0.338,
    "RGECO": 0.3355,
    "RGECO-TnT": 0.3139,
    "RGECO-TnI": 0.3124
  },
  {
    "x": 1.9865,
    "control": 0.2974,
    "RGECO": 0.2947,
    "RGECO-TnT": 0.2712,
    "RGECO-TnI": 0.2706
  }
]

uploadData.forEach(function(obj) {
    db.collection("SarcLengthVsTime2D").add({
        x: obj.x,
        control: obj.control,
        RGECOTNT: obj["RGECO-TnT"],
        
        
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});