<?php

namespace App;

class Flash
{

    /**
     * Master file to create and mix messages.
     *
     * @param        $message
     * @param        $type
     * @param string $key
     * @return mixed
     */
    public function create($message, $type, $key = 'flash_message')
    {
        return session()->flash($key, [
            'message' => $message,
            'type'   => "alert-$type",
            'is_ajax' => request()->expectsJson()
        ]);
    }

    /**
     * Generate a success message
     *
     * @param $message
     * @return mixed
     */
    public function success($message)
    {
        return $this->create($message, 'success');
    }

    /**
     * Generate an error message
     *
     * @param $message
     * @return mixed
     */
    public function error($message)
    {
        return $this->create($message, 'danger');
    }

    /**
     * Generate an primary message
     *
     * @param $message
     * @return mixed
     */
    public function primary($message)
    {
        return $this->create($message, 'primary');
    }

    public function warning($message)
    {
        return $this->create($message, 'warning');
    }

    /**
     * Show the info (primary) message
     *
     * @param $message
     * @return mixed
     */
    public function info($message)
    {
        return $this->create($message, 'info');
    }

}
