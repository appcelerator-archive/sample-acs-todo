var Cloud = require('ti.cloud');    
var DATABASE_NAME = 'todo';

exports.createDb = function() {
	//Ti.Database.install('todo.sqlite', DATABASE_NAME);
};

exports.selectItems = function(_done, callback) {
	Cloud.Objects.query({
	    classname: 'todo',
	    page: 1,
	    per_page: 100, // TODO: paginate
	    where: {
	        done: _done
	    }
	}, function (e) {
	    if (e.success) {
        	var retData = [];
	        for (var i = 0; i < e.todo.length; i++) {
	            var todo = e.todo[i];
				retData.push({item:todo.item, id:todo.id});
	        }
	    }
	    else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
    	callback(retData);
	});


};

exports.updateItem = function(_id, _done, callback) { 
	Cloud.Objects.update({
	    classname: 'todo',
	    id: _id,
	    fields: {
	        done: _done
	    }
	}, function (e) {
	    if (e.success) {
	    	// NOP
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	    callback();
	});

};

exports.addItem = function(_item, callback) {
	Cloud.Objects.create({
	    classname: 'todo',
	    fields: {
	        item: _item,
	        done: 0
	    }
	}, function (e) {
	    if (e.success) {
	        var todo = e.todo[0];
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
		callback();
	});
};

exports.deleteItem = function(_id, callback) {
	Cloud.Objects.remove({
	    classname: 'todo',
	    id: _id
	}, function (e) {
	    if (e.success) {
	    	// NOP
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
    	callback();
	});
};