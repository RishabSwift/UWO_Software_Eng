<div>
    Your selected goal: <span class="text-primary h3">{{ auth()->user()->goal_name ?? 'N/A' }}</span>

    <hr>

    @foreach($plans as $plan)

        <h2>{{ $plan->name }}</h2>
        <div class="card mb-3 mb-5">
            <div class="card-body bg-light">
                <div class="row align-items-center">
                    <div class="col ml-n2">

                        <div class="row">
                            @foreach($plan->exercisePlans as $exercise_plan)
                                <div class="col-md-4 text-center">
                                    <img src="{{ \App\Models\Exercise::icon($exercise_plan->exercise_name) }}"
                                         alt=""
                                         class="img-fluid img-thumbnail w-50">
                                    <h3 class="mt-3 text-center">{{ $exercise_plan->exercise_name }}</h3>
                                </div>
                            @endforeach
                        </div>

                        <hr>
                        <div class="table-responsive">
                            <table class="table mt-3 table-nowrap">
                                <thead>
                                <tr>
                                    <th scope="col">Day</th>
                                    <th scope="col">Breakfast</th>
                                    <th scope="col">Lunch</th>
                                    <th scope="col">Dinner</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($plan->dietPlans as $diet_plan)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>
                                        <td>{{ $diet_plan->diet->breakfast }}</td>
                                        <td>{{ $diet_plan->diet->lunch }}</td>
                                        <td>{{ $diet_plan->diet->dinner }}</td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div class="col-12 mt-3">

                        @if ($plan->name == auth()->user()->plan_name)
                            <a href="#!"
                               wire:click="unselectPlan"
                               class="btn btn-primary d-none btn-block d-md-inline-block">
                                <i class="fe fe-check"></i>
                                Selected
                            </a>
                        @else
                            <a href="#!"
                               wire:click="selectPlan('{{ $plan->name }}')"
                               class="btn btn-outline-primary d-none btn-block d-md-inline-block">
                                <i class="fe fe-check"></i>
                                Select Plan
                            </a>
                        @endif


                    </div>

                </div> <!-- / .row -->
            </div> <!-- / .card-body -->
        </div>

    @endforeach
</div>
