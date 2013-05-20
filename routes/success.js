/*
 * GET success page.
 */

exports.success = function(req, res){
    console.log("routes/success!!");
    res.render('success', { title: 'Express' });
};
