$(document).ready(function () {
  let valorToggle = false;
  let mes = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  $(".navToggle").on("click", function () {
    if (valorToggle) {
      $(".navToggle").html('Dark <i class="bi bi-moon-fill"></i>');
      $("html").attr("data-theme", "Light");

      valorToggle = false;
    } else {
      $(".navToggle").html('Light <i class="bi bi-brightness-high-fill"></i>');
      $("html").attr("data-theme", "Dark");
      valorToggle = true;
    }
  });

  $("input").on("keypress", enterVal);
  $("button").on("click", () => {
    pegarValor($("input").val());
  });

  function pegarValor(param) {
    if (param.trim() !== "") {
      param = param.trim();
      $.ajax({
        url: `https://api.github.com/users/${param}`,
        method: "GET",
        datatype: "json",
        success: function (data) {
          const {
            login,
            name,
            bio,
            created_at,
            avatar_url,
            html_url,
            public_repos,
            followers,
            following,
            location,
            twitter_username,
            blog,
            company,
          } = data;

          const dt = new Date(created_at);

          $(".img-profile").attr("src", avatar_url);
          $(".nome-profile").html(name);
          $(".link-profile").html(`@${login}`);
          $(".link-profile").attr("href", html_url);
          $(".data-profile").html(
            `Joined ${dt.getDate()} ${mes[dt.getMonth()]} ${dt.getFullYear()}`
          );
          $(".bio-profile").html(`${bio ? bio : "This profile has no bio."}`);
          $(".bio-profile-mobile").html(
            `${bio ? bio : "This profile has no bio."}`
          );

          $('span[data-info="repo"]').html(public_repos);
          $('span[data-info="seguidores"]').html(followers);
          $('span[data-info="seguindo"]').html(following);

          disponibilidadeDados("location", location);

          disponibilidadeDados("blog", blog);

          disponibilidadeDados("twitter_username", twitter_username);

          disponibilidadeDados("company", company);
          $(".erro").remove();
        },
        error: function (error) {
          $(".erro").remove();
          $("button").before(
            `<span class="text-danger erro" role="alert">No results</span>`
          );
        },
      });
    }
  }

  function enterVal(param) {
    if (param.keyCode == 13) {
      pegarValor($(this).val());
    }
  }

  function disponibilidadeDados(param, valor) {
    console.log($(`.${param}-container`));
    if (valor) {
      $(`.${param}-container`).removeClass("desativo");
      $(`.${param}-container`).addClass("ativo");
      if (param === "twitter_username") {
        $(`.${param}`).html("@" + valor);
        return;
      }
      $(`.${param}`).html(valor);
    } else {
      $(`.${param}-container`).removeClass("ativo");
      $(`.${param}-container`).addClass("desativo");
      $(`.${param}`).html("Not Available");
    }
  }

  pegarValor("octocat");
});
