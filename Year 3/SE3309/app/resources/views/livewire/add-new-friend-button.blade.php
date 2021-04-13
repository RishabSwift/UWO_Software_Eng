<div>
@if ($user->id != auth()->user()->id)
    <!-- Button -->

    @if (auth()->user()->isFriendsWith($user))
        <!-- Button -->
            <a wire:click="toggleFriend({{ $user }})" href="#!" class="btn btn-sm btn-danger d-none d-md-inline-block">
                <i class="fe fe-user-plus"></i>
                Remove Friend
            </a>
        @else
            <a wire:click="toggleFriend({{ $user }})" href="#!" class="btn btn-sm btn-primary d-none d-md-inline-block">
                <i class="fe fe-user-plus"></i>
                Add Friend
            </a>
        @endif
    @endif
</div>
