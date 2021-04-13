<div class="card">
    <div class="card-body">

        <!-- Header -->
        <div class="mb-3">
            <div class="row align-items-center">

                <div class="col ml-n2">

                    <!-- Title -->
                    <h4 class="mb-1">
                        <a href="{{ route('profile.index', $post->user) }}">{{ $post->user->username }}</a>
                    </h4>

                    <!-- Time -->
                    <p class="card-text small text-muted">
                        <span class="fe fe-clock"></span>
                        <time datetime="2018-05-24">
                            {{ $post->created_at->diffForHumans() }}
                        </time>
                    </p>

                </div>
            </div> <!-- / .row -->
        </div>

        <!-- Text -->
        <p class="mb-3">
            {!! nl2br($post->content) !!}
        </p>

        @if (count($comments) > 0)
            <hr>

            @foreach($comments as $comment)
                <div class="comment mb-3">
                    <div class="row">

                        <div class="col ml-n2">

                            <!-- Body -->
                            <div class="comment-body">

                                <div class="row">
                                    <div class="col">

                                        <!-- Title -->
                                        <h5 class="comment-title">
                                            <a href="{{ route('profile.index', $comment->user) }}">{{ $comment->user->username }}</a>
                                        </h5>

                                    </div>
                                    <div class="col-auto">

                                        <!-- Time -->
                                        <time class="comment-time">
                                            {{ $comment->created_at->diffForHumans() }}
                                        </time>


                                    </div>
                                </div> <!-- / .row -->

                                       <!-- Text -->
                                <p class="comment-text">
                                    {!! nl2br($comment->content) !!}
                                </p>

                            </div>

                        </div>
                    </div> <!-- / .row -->
                </div>
        @endforeach
    @endif
    <!-- Divider -->
        <hr>

        <form wire:submit.prevent="saveComment">

            <!-- Form -->
            <div class="row">
            </div>
            <div class="col ml-n2">


                <!-- Label -->
                <label class="sr-only">Leave a comment...</label>

                <!-- Textarea -->
                <textarea wire:model="comment.content" class="form-control form-control-flush"
                          data-toggle="autosize"
                          rows="3"
                          placeholder="Leave a comment"></textarea>
                @include('layouts.errors')

            </div>
            <div class="col-auto text-right">

                <button type="submit" class="btn btn-primary btn-sm">
                    Post
                    <i class="fe fe-arrow-up"></i>
                </button>

            </div>
        </form>

    </div>

</div>
