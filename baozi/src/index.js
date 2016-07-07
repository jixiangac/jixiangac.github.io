// 通过全局变量的方式初始化
var addTip = function() {
        $('.item').each(function(index, item) {
            var $t = $(item);
            $(item).tooltip('show');
            var $clone = $t.parent().find('.tooltip').clone(true);
            $t.parent().append( $clone );
            $(item).tooltip('hide');
        });   
}

var player = new _mu.Player({
        mode: 'list',
        baseDir: './build/dist'
    }),
    $pl = $('#playlist-demo'),
    reset = function() {
        $pl.find('.item a').removeClass('playing pause')
            .find('.time').remove();
    },
    findCurrItem = function() {
        var link = player.getCur();
        link = decodeURIComponent(link);
        return $pl.find('[data-link="' + link + '"]');
    },
    $time = $('<span class="time"></span>');

$pl.on('click tap', '.item a', function() {
    var $this = $(this),
        sids;
    if ($this.hasClass('playing')) {
        player.pause();
    } else if ($this.hasClass('pause')) {
        player.play();
    } else {
        $this.addClass('playing')
        sids = $this.parent().find('.item a').map(function() {
            return $(this).data('link');
        }).get();

        player.reset().add(sids)
            .setCur($this.data('link')).play();
    }
});

player.on('playing pause', function() {
    reset();
    var $t = findCurrItem();
    var status = player.getState();
    $t.addClass( status );
}).on('ended', reset).on('timeupdate', function() {
    // $time.text(player.curPos(true) + ' / ' + player.duration(true));
});


$('[data-toggle="tooltip"]').tooltip();

addTip();

