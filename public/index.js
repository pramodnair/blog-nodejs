console.log("Client code is running");

$(".post-del").click(function () {
  let id = $(this).attr("value");
  $.post("/posts/delete", { id: id }, function () {
    location.reload();
  });
  console.log(id);
});

$(".post-update").click(function () {
  let id = $(this).attr("value");
  $.get("/posts/update", { id: id }, function (data) {
    $("main.container").html(data);
  });
});

$(".read-more").click(function () {
  let id = $(this).attr("id");
  console.log(id);
  $.get("/posts", { id: id }, function (html) {
    console.log(html);
    $("main.container").html(html);
  });
});
