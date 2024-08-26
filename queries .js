// 1. Find all the topics and tasks which are thought in the month of October
db.topics.find({date:{$regex:"Oct"}},{topics_title:1,date:1,_id:0});
db.tasks.aggregate([{$match:{assigned_date:{$regex:"Oct"}}},{$group:{_id:"$task_name"}},{$project:{task:"$_id",_id:0}}]);

// 2. Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.companydrives.find({$and:[{date:{$regex:"Oct"}},{date:{$gte:"15"}},{date:{$lte:"31"}}]},{company:1,date:1,_id:0},{sort:{date:1}});

// 3. Find all the company drives and students who are appeared for the placement
db.companydrives.find({},{company:1,students_appeared:1,_id:0}).toArray();

// 4. Find the number of problems solved by the user in codekata
db.codekata.aggregate([{$match:{isCompleted:true}},{$group:{_id:"$userId",problemsSolved:{$sum:1}}},{$project:{userId:"$_id",problemsSolved:1,_id:0}}]);

// 5. Find all the mentors with who has the mentee's count more than 15
db.mentors.find({students:{$gt:15}},{mentor_id:1,mentor_name:1,students:1,_id:0},{sort:{students:1}});

// 6. Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020

// attendance collection

// To find list of users absent between between 15 oct-2020 and 31-oct-2020
db.attendance.aggregate([{$match:{$and:[{date:{$regex:"Oct",$gte:"15",$lte:"31"}},{isPresent:false}]}},{$group:{_id:"$UserId"}},{$project:{userId:"$_id",_id:0}}]);
// To find absentism for each user between 15 oct-2020 and 31-oct-2020
db.attendance.aggregate([{$match:{$and:[{date:{$regex:"Oct",$gte:"15",$lte:"31"}},{isPresent:false}]}},{$group:{_id:"$UserId",absent_days:{$sum:1}}},{$project:{userId:"$_id",absent_days:1,_id:0}}]);
// To find number of users absent between 15 oct-2020 and 31-oct-2020 - without repition
// Ex: considresing UserId only
db.attendance.aggregate([{$match:{$and:[{date:{$regex:"Oct",$gte:"15",$lte:"31"}},{isPresent:false}]}},{$group:{_id:"$UserId"}},{$group:{_id:"null",count:{$sum:1}}},{$project:{count:1,_id:0}}]);
// To find number of users absent between 15 oct-2020 and 31-oct-2020 - with repition
// Ex: UserID-1 is absent for 4 days + UserID-2 is absent for 5 days + UserID-3 is absent for 2 days + ...
db.attendance.find({$and:[{date:{$regex:"Oct",$gte:"15",$lte:"31"}},{isPresent:false}]}).count();

// task collection

// To find list of user who did not submit task between 15 oct-2020 and 31-oct-2020
db.tasks.aggregate([{$match:{$and:[{due_date:{$regex:"Oct",$gte:"15",$lte:"31"}},{IsSubmitted:false}]}},{$group:{_id:"$UserID"}},{$project:{userId:"$_id",_id:0}}]);
// To find not submitted task list for every user between 15 oct-2020 and 31-oct-2020
db.tasks.aggregate([{$match:{$and:[{due_date:{$regex:"Oct",$gte:"15",$lte:"31"}},{IsSubmitted:false}]}},{$group:{_id:"$UserID",notSubmittedTask:{$sum:1}}},{$project:{userId:"$_id",notSubmittedTask:1,_id:0}}]);
// To find number of user who did not submit task between 15 oct-2020 and 31-oct-2020
db.tasks.aggregate([{$match:{$and:[{due_date:{$regex:"Oct",$gte:"15",$lte:"31"}},{IsSubmitted:false}]}},{$group:{_id:"$UserID"}},{$group:{_id:"null",count:{$sum:1}}},{$project:{count:1,_id:0}}]);