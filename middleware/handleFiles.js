const handleFiles = ()=>{
    const {originalname, path} = req.file;
    const part = originalname.split(".");
    const ext = part[part.length - 1];
    const newPath = `${path}.${ext}`;
    return fs.renameSync(path, newPath)
}

module.exports = handleFiles;