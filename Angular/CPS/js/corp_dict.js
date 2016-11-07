var gStartsWith, gCat, gSubcat, catData;
var loadingImg = "<img class='loadingImg' src='/cps/_assets/images/ajax-loader.gif'></image>";

$(document).ready(function() {
  $('#CpsDictionaryDiv').html(loadingImg);
  // Start the page with a default listing of all the terms starting with "A".
  $('#DictionaryForm').submit(function() {
    return false;
  });
  $('#searchText').keypress(function (e) {
    var key = e.which;
    if(key == 13){  // the enter key code
      doSearch();
      return false;
    }
  });

  gStartsWith = "A";
  updateDisplay();
  // Build the Category dropdown select list.
  var categoriesURL = "https://cfwebprod.sandia.gov/cfdocs/CDM/services/getTermCategory.cfm?callback=?";
  $.getJSON(categoriesURL, function(catData) {
    $('#category').html('');
    $('#category')
        .append($("<option></option")
            .attr("value", "")
            .text("All"));

    $.each(catData, function(index) {
      if(catData[index].category.indexOf("Directives") > -1 || catData[index].category.indexOf("Other") > -1) {
        return;
      }
      $('#category')
          .append($("<option></option")
              .attr("value", catData[index].category)
              .text(catData[index].category));

    });

    $('#subcategory').html('');
    $('#subcategory')
        .append($("<option></option")
            .attr("value", "All")
            .text("All"));

    $('#category').on('change', function() {
      gCat = this.value;
      updateSubCategories(catData, gCat);
      updateDisplay();
    });

    $('#subcategory').on('change', function() {
      gSubCat = this.value;
      updateDisplay();
    });

    $('#catReset').on('click', function() {
      resetCats();
    });

    $('#dictSearchButton').on('click', function() {
      updateDisplay('');
    });

    $("input:radio[name=searchType]").click(function(){
      if(           $('#searchText').val() != '') {
        updateDisplay();
      }
    });

  });
});

function updateDisplay(obj) {

  $('#CpsDictionaryDiv').html(loadingImg);

  var content = "<h2 id = 'resultHeading'>";

  if (obj || obj == '') {
    gStartsWith = obj;
  }

  var url = "https://cfwebprod.sandia.gov/cfdocs/CDM/services/getDictionaryTerm.cfm?callback=?";

  searchTerm = $('#searchText').val();

  if(searchTerm && searchTerm != '') {

    if(gStartsWith != '') {
      content += "\"" + gStartsWith + "\" Terms";
      url += "&startsWith=" + gStartsWith ;
    }
    else {
      content += "All Terms";
    }

    var typeOfSearch = $('input[name=searchType]:checked', '#DictionaryForm').val();
    switch(typeOfSearch) {
      case "TermAndDef" :
        url += "&term_name="+searchTerm;
        url += "&term_definition="+searchTerm;
        content += " with Term or Definition containing \"" + searchTerm + "\"";
        break;
      case "DefOnly" :
        url += "&term_definition="+searchTerm;
        content += " with Definition containing \"" + searchTerm + "\"";
        break;
      case "TermOnly" :
        url += "&term_name="+searchTerm;
        content += " with Term containing \"" + searchTerm + "\"";
        break;
    }
  }

  if(gStartsWith != 'undefined' && gStartsWith != '' && searchTerm == '') {
    url += "&startsWith=" + gStartsWith ;
    content += "\""+gStartsWith+"\"";
  }

  if(typeof gCat != 'undefined' && gCat != '') { // There's a category.
    url += "&category="+gCat; /////////////////////////////////////////////
    content += " within category \""+gCat+"\"";
  }

  if(typeof gSubCat != 'undefined' && gSubCat != '' && gSubCat != '--None--') { // There's a subcategory.
    url += "&sub_category="+gSubCat; /////////////////////////////////////////////
    content += " and \"" + gSubCat + "\"";
  }
  content += "</h2>";

  //console.info("url: " + url);

  $.getJSON(url, function(data) {
    if(data.length){
      $.each(data, function(index,term) {
        content += "<div class='termName'>" + term.term_name + "</div>" + "<div class='termDefinition'>" + term.term_definition + "</div>";
        if(term.categories[0]) {
          content += "<div class='termCategories'><span class='termCategoryLabel'>Categories:</span> ";
          // BAA -- loop over categories
          $.each(term.categories, function(k,cat){
            if (k > 0) content += "&nbsp;,&nbsp;";
            content += "<span class='termCategory'>" + cat.category + " <span class='categoryArrow'> &gt; </span> " + cat.sub_category + "</span>";
          });
          content += "</div>";
        }

        content += "<div class='termIds'><span class='termIdLabel'>Term ID:</span> <span class='termId'>" + term.term_id + "</span></div>";

        // BAA -- add related terms
        if (term.related.length > 0) {
          content += '<div class="termIds"><span class="termCategoryLabel">See Also:&nbsp;</span>';
          $.each(term.related, function(k,rTerm) {
            if (k > 0) { content += ", "; }
            content += '<a href="#" onclick="return popitup(' + "'" + 'https://dictionary.sandia.gov/remoteTermDef.cfm?termId=' + rTerm.term_id + "'" + ');">' + rTerm.term_name + '</a>'
          });
          content += "</div>";
        }
        content += "<br/><br/>";
      });
    }
    else {
      content = "No results";
    }
    $('#CpsDictionaryDiv').html(content);
    $('.termName').highlight(searchTerm);
    $('.termDefinition').highlight(searchTerm);


  });
}


function updateSubCategories(catData, val) {

  $('#subcategory').html('');

  if(val != ''){
    var result = $.grep(catData, function(e){ return e.category == val; });
    $.each(result[0].sub_categories, function(index) {
      $('#subcategory')
          .append($("<option></option")
              .attr("value", result[0].sub_categories[index])
              .text(result[0].sub_categories[index]));
    });
  }
  else {
    gSubCat = '';
  }
}

function resetCats() {
  updateSubCategories(null, '');
  jQuery("#category option:first-child").attr("selected", true);
  gCat = "";
  $('#searchText').val('');
  $("#searchTypeTermAndDef").prop("checked", true);
  gStartsWith = "A";
  updateDisplay();

}

function doSearch() {
  searchTerm = $('#searchText').val();
  updateDisplay('', searchTerm);
}
