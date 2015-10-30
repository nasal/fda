$(document).ready(function() {
    
    // Process textarea content. 
    $('#submitData').click(function(e) {
        e.preventDefault();
        var delimiter = $('#csvDelimiter option:selected').attr('value');
        $('.step1').slideUp();
        $('.step2').slideDown();
        readCsv(delimiter);
    });

    // Remove class on checkbox check.
    $(document).on('click', '.hideMarker', function(e) {
        $(this).closest('tr').toggleClass('displayMarker');
    });

    // Read markers and render map on button click.
    $('#renderMap').click(function(e) {
        e.preventDefault();
        var markers = [];
        var dt = $('#dataTable').dataTable();
        $(dt.fnGetNodes()).each(function(i, v) {
            var tr = $(this);
            if (tr.hasClass('displayMarker')) {
                var lat = tr.find('td')[$('#latitude option:selected').attr('value')];
                var lon = tr.find('td')[$('#longitude option:selected').attr('value')];
                var label = tr.find('td')[$('#label option:selected').attr('value')];
                var marker = [$(label).html(), $(lat).html(), $(lon).html()];
                markers.push(marker);
            }
        });
        $('.step2').slideUp();
        $('.tableData').slideDown();
        renderMap(markers);
    });

    $(document).on('click', '.hideData', function(e) {
        e.preventDefault();
        if ($(this).text() == 'hide') {
            $('.tableData').animate({ 'top': '85%' }).css('transform', '');
            $('.hideData').text('show');
        } else {
            $('.tableData').animate({ 'top': '50%' }).css('transform', 'translateY(-50%)');
            $('.hideData').text('hide');
        }
    });

    // Loop over TDs and replace image links with image elements.
    function renderImages() {
        $('#dataTable tbody td').each(function() {
            $(this).html($(this).html().replace(/(http:\/\/\S+(\.png|\.jpg|\.gif))/g, '<img src="$1" style="width: 100%;">'));
        });
    }

    // Super simple CSV parser.
    function readCsv(delimiter) {
        var inputData = $('#inputData').val();
        var header = inputData.slice(0, inputData.indexOf('\n'));
        var content = inputData.substring(inputData.indexOf('\n')+1);
        renderHeader(header, delimiter);
        renderContent(content, delimiter);
    }

    function renderHeader(header, delimiter) {
        // Reset table and dropdown options.
        $('#dataTable thead tr > th').remove();
        $('#dataTable tbody > tr').remove();
        $('#latitude option').remove();
        $('#longitude option').remove();
        $('#label option').remove();

        // Fill table headers and dropdown options.
        var thead = $('#dataTable thead tr');
        var lat = $('#latitude');
        var lon = $('#longitude');
        var label = $('#label');
        var columns = header.split(delimiter);
        $.each(columns, function(i, v) {
            var th = $('<th></th>').text(v);
            var option = $('<option value="' + i + '">' + v + '</option>');
            lat.append(option);
            lon.append(option.clone());
            label.append(option.clone());
            thead.append(th);         
        });
        var hide = $('<th></th>').text('Hide');
        thead.append(hide);
    }

    function renderContent(content, delimiter) {
        // Render table body.
        var rows = content.split('\n');
        $.each(rows, function (i, v) {
            var tr = $('<tr class="displayMarker"></tr>');
            var columns = v.split(delimiter);
            $.each(columns, function (j, c) {
                var td = $('<td></td>').text(c);
                tr.append(td);
            });
            var hide = $('<td></td>').html('<input type="checkbox" class="hideMarker">');
            tr.append(hide);
            $('#dataTable tbody').append(tr);
        });

        // Initialize DataTable.
        $('#dataTable').DataTable();
        
        // Render images.
        renderImages();

        // Linkify data.
        $('#dataTable').linkify({
            target: "_blank",
            format: function (value, type) {
               if (type === 'url' && value.length > 43) {
                   value = value.slice(0, 20) + '...' + value.slice(value.length-20);
               }
               return value;
            }
        });
    }

});

