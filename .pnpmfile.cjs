module.exports = {
  hooks: {
    readPackage(pkg, context) {
        throw new Error(`Package ${pkg.name} is not allowed.`); 
    }
  }
};