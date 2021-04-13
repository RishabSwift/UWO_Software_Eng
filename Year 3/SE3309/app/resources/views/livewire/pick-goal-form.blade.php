<div>


    @foreach ($goals as $goal)

        <div class="card mb-3">
            <div class="card-body bg-light">
                <div class="row align-items-center">
                    <div class="col ml-n2">

                        <!-- Title -->
                        <h4 class="mb-1">
                            {{ $goal }}
                        </h4>

                    </div>
                    <div class="col-auto">

                        @if ($goal == auth()->user()->goal_name)
                            <a href="#!"
                               wire:click="unselectGoal"
                               class="btn btn-sm btn-primary d-none d-md-inline-block">
                                <i class="fe fe-check"></i>
                                Selected
                            </a>
                        @else
                            <a href="#!"
                               wire:click="selectGoal('{{ $goal }}')"
                               class="btn btn-sm btn-outline-primary d-none d-md-inline-block">
                                <i class="fe fe-check"></i>
                                Select Goal
                            </a>
                        @endif


                    </div>

                </div> <!-- / .row -->

            </div> <!-- / .card-body -->
        </div>


    @endforeach

    @if (auth()->user()->goal_name)
        <hr>
        <div class="text-center">
            <button wire:click="$emit('openPlanModal')" class="btn btn-success btn-block">Continue to Plan <i class="fe fe-arrow-right"></i></button>
        </div>
    @endif

</div>
