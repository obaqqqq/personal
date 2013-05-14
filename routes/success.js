/*
 * GET success page.
 */

exports.success = function(req, res){
    console.log("success!!");
    res.render('success', { title: 'Express' });
};
