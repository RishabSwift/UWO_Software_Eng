<?php

namespace App\Http\Livewire;

use App\User;
use Livewire\Component;
use Livewire\WithPagination;

class AllUsers extends Component
{
    //    public $users;
    public $search;
    protected $queryString = ['search'];
    use WithPagination;
    protected $paginationTheme = 'bootstrap';

    public function render()
    {
        //        $this->users = User::select('username', 'id', 'goal_name', 'plan_name')->get();
        return view('livewire.all-users', [
            'users' => User::where('username', 'LIKE', "%{$this->search}%")
                ->with('friendOf')
                ->with('friendsOfMine')
                ->withCount(['posts', 'comments'])
                ->paginate(100),
        ]);
    }



    //    public function updatedQuery($value)
    //    {
    //        $this->search();
    //    }
}
