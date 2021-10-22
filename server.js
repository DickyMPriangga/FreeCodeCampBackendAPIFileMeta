var express = require('express');
var multer = require('multer');
var cors = require('cors');
require('dotenv').config()

var app = express();

var storage = multer.diskStorage({
  destination: (req,file,cb) => cb(null, 'uploads/'),
  filename: (req,file,cb) => {
    var name = file.originalname.split('.');
    console.log(name);
    cb(null, name[0]+ '-' + Math.round(Math.random() * 1E9)+'.'+name[1]);
  }
})
var upload = multer({storage: storage});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req,res) {
  console.log(req.file, req.body);
  res.json({
    name:req.file.originalname,
    type:req.file.mimetype,
    size:req.file.size
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
