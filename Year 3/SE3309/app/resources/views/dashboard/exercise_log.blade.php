@extends('layouts.app')

@section('container')

    <div class="col-12 col-xl-8">

        <!-- Products -->
        <div class="card">
            <div class="card-header">

                <!-- Title -->
                <h2 class="card-header-title">
                    Your exercise log
                </h2>


            </div>

            @if (count($logs) > 0 )
                <div class="table-responsive mb-0"
                     data-list="{&quot;valueNames&quot;: [&quot;products-product&quot;, &quot;products-stock&quot;, &quot;products-price&quot;, &quot;products-sales&quot;]}"
                     id="productsList">
                    <table class="table table-sm table-nowrap table-hover card-table">
                        <thead>
                        <tr>
                            <th>
                                <a href="#" class="text-muted list-sort">
                                    Exercise
                                </a>
                            </th>
                            <th>
                                <a href="#" class="text-muted list-sort">
                                    Log
                                </a>
                            </th>
                        </tr>
                        </thead>
                        <tbody class="list">
                        @foreach ($logs as $log)
                            <tr>
                                <td>
                                    <div class="d-flex align-items-center">

                                        <!-- Image -->
                                        <div class="avatar">
                                            <img class="avatar-img rounded mr-3"
                                                 src="{{ \App\Models\Exercise::icon($log->exercise_name) }}"
                                                 alt="...">
                                        </div>

                                        <div class="ml-3">

                                            <!-- Heading -->
                                            <h4 class="font-weight-normal mb-1">{{ $log->exercise_name }}</h4>

                                            <!-- Text -->
                                            <small class="text-muted">{{ $log->created_at->diffForHumans() }}</small>

                                        </div>

                                    </div>
                                </td>
                                <td>


                                    <div class="list-group list-group-flush">
                                        @foreach ($log->{$log->type()}->data() as $key => $type)
                                            <span class="mb-1 text-muted">
                                                {{ $key }}: <span class="text-body">
                                                    {{ $type }}
                                                </span>
                                            </span>

                                        @endforeach

                                        @if ($log->current_weight)
                                            <span class="mb-1 text-muted">
                                                Current Weight: <span class="text-body">
                                                    {{ $log->current_weight }} lb
                                                </span>
                                            </span>
                                        @endif
                                    </div>


                                </td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            @else


                <div class="card-body">
                    <div class="alert alert-primary">
                        <i class="fe fe-alert-triangle"></i>
                        You haven't worked out yet!
                    </div>
                </div>

            @endif
        </div>

    </div>

@stop
