const {BlobServiceClient} = require('@azure/stroage-blob');
var multipart = require("parse-multipart");

const AZURE_STORAGE_CONNECTION_STRING = process.env("AZURE_STORAGE_CONNECTION_STRING");

module.exports = async function (context , reg) {

    context.log("TRIGGER");

    var bodyBuffer = Buffer.from(req.body);

    var boundary multipart.getBoundary(req.headers['content-type']);

    var part = multipart.Parse(bodyBuffer , boundary);

    const blobServiceClient = await BlobServiceClient.getContainerClient(container);

    const container = "candidate";

    const blobName = part[0].filename;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const uploadBlobResp = await bloockBlobClient.upload(parts[0].data , part[0].data.length);


    context.res = {
        body:{
            name:parts[0].filename , 
            type:parts[0].type,
            data:parts[0].data.length,
        }
    }

    context.done()
    
}